import { parseBody } from 'next-sanity/webhook'
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { body, isValidSignature } = await parseBody<{
			_id: string
			_type: 'blog' | 'home' | 'post' | 'page'
			slug: { current: string }
		}>(req, process.env.SANITY_STUDIO_WEBHOOK_REVALIDATE)

		if (!isValidSignature) {
			const message = 'Invalid signature'
			return new Response(message, { status: 401 })
		}

		if (!body?._id) {
			return new Response('Bad Request', { status: 400 })
		}

		const tags = {
			home: 'index',
			blog: 'listing',
			post: body.slug.current,
			page: body.slug.current,
		}
		const tag = tags[body._type]
		if (tag) revalidateTag(tag)

		return NextResponse.json({
			status: 200,
			revalidated: true,
			now: Date.now(),
			body,
		})
	} catch (err: any) {
		console.error(err)
		return new Response(err.message, { status: 500 })
	}
}
