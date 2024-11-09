import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { env } from '~/env/server'
import { createAuthClient, createClient } from '~/lib/gqlClient'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const secret = searchParams.get('secret')
	const id = searchParams.get('id')

	if (secret !== env.HEADLESS_SECRET || !id) {
		return new Response('Invalid token', { status: 401 })
	}

	const { login } = await createClient().LoginUser({
		username: env.WP_USER,
		password: env.WP_APP_PASS,
	})

	const authToken = login.authToken

	console.log({ authToken })

	draftMode().enable()

	const authSdk = createAuthClient(`Bearer ${authToken}`)

	const { contentNode } = await authSdk.GetContentNode({ id })

	if (!contentNode) {
		return new Response('Invalid id', { status: 401 })
	}

	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${contentNode.databaseId}`
	const response = NextResponse.redirect(url)

	response.headers.set('Set-Cookie', `wp_jwt=${authToken}; path=/;`)

	return response
}
