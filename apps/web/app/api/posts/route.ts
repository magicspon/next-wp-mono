import { type NextRequest, NextResponse } from 'next/server'
import { runQuery } from '@spon/cms/lib/runner'
import {
	type TQueryArgs,
	postPagination,
} from '@spon/cms/queries/pages/blog.query'
import { PER_PAGE } from '@spon/cms/queries/utils/constants'

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url)
		const cursor = url.searchParams.get('cursor')
		const count = url.searchParams.get('count') ?? PER_PAGE
		const from = Number(cursor)
		const pagination: TQueryArgs = {
			from,
			count: Number(count),
		}

		const data = await runQuery(
			postPagination(pagination),
			{},
			{ next: { tags: ['posts'] } },
		)
		const finalPage = Math.ceil((data.total as number) / PER_PAGE)
		const nextId = from + 1

		return NextResponse.json({
			pages: data.items.posts,
			nextId: nextId < finalPage ? nextId : null,
			previousId: from,
		})
	} catch (err: any) {
		console.error(err)
		return new Response(err.message, { status: 404 })
	}
}
