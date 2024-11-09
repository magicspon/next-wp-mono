import { GraphQLClient } from 'graphql-request'
import { cookies, draftMode } from 'next/headers'
import { env } from '~/env/server'
import type { Sdk } from '~/schema/generated.graphql'
import { getSdk } from '~/schema/generated.graphql'

export function graphQLClient(preview: boolean): GraphQLClient {
	const headers: HeadersInit = {
		'API-KEY': env.GRAPHQL_API_AUTH_SECRET_KEY,
	}

	if (preview) {
		const { isEnabled } = draftMode()
		if (isEnabled) {
			const token = cookies().get('wp_jwt')?.value
			headers.Authorization = `Bearer ${token}`
		}
	}

	return new GraphQLClient(env.GRAPHQL_ENDPOINT, { headers })
}

export function createClient(preview = false): Sdk {
	return getSdk(graphQLClient(preview))
}

export function createAuthClient(token: string): Sdk {
	return getSdk(
		new GraphQLClient(env.GRAPHQL_ENDPOINT, {
			headers: {
				'API-KEY': env.GRAPHQL_API_AUTH_SECRET_KEY,
				Authorization: token,
			},
		}),
	)
}
