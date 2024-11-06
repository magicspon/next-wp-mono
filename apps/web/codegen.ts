import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const config: CodegenConfig = {
	overwrite: true,
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},

	schema: [
		{
			[`${process.env.GRAPHQL_ENDPOINT}`]: {
				headers: {
					Authorization: process.env.GRAPHQL_JWT_AUTH_SECRET_KEY!,
					'API-KEY': process.env.GRAPHQL_API_AUTH_SECRET_KEY!,
				},
			},
		},
	],

	documents: 'app/**/*.graphql',
	generates: {
		'app/schema/generated.graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
			config: {
				withHooks: false,
				maybeValue: 'T',
				avoidOptionals: {
					field: true,
					inputValue: true,
					object: true,
					defaultValue: true,
				},
			},
		},
	},
}

export default config
