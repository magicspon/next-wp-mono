import { GraphQLClient } from 'graphql-request'
import { env } from '~/env/server'
import type { Sdk } from '~/schema/graphql'
import { getSdk } from '~/schema/graphql'

export function graphQLClient(
	authorization = `Bearer ${env.GRAPHQL_TOKEN}`,
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
