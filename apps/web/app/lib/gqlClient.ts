import { GraphQLClient } from 'graphql-request'
import { env } from '~/env/server'
import type { Sdk } from '~/schema/generated.graphql'
import { getSdk } from '~/schema/generated.graphql'

export function graphQLClient(
	authorization = env.GRAPHQL_TOKEN,
): GraphQLClient {
	const src = env.GRAPHQL_ENDPOINT

	const headers = {
		authorization,
	}

	return new GraphQLClient(src, { headers })
}

export function createSdk(): Sdk {
	const client = graphQLClient()
	const sdk = getSdk(client)

	return sdk
}

export const sdk = createSdk()
