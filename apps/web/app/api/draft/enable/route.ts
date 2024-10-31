import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { client } from '@spon/cms/lib/client'
import { env } from '~/env/server'

const clientWithToken = client.withConfig({
	token: env.SANITY_STUDIO_READ_TOKEN,
})

export async function GET(request: Request) {
	if (!env.SANITY_STUDIO_READ_TOKEN) {
		return new Response(
			'Missing environment variable SANITY_STUDIO_READ_TOKEN',
			{
				status: 500,
			},
		)
	}

	const { isValid, redirectTo = '/' } = await validatePreviewUrl(
		clientWithToken,
		request.url,
	)

	if (!isValid) {
		return new Response('Invalid secret', { status: 401 })
	}

	draftMode().enable()
	return NextResponse.redirect(new URL(redirectTo, request.url))
}
