import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

console.log({ schema: process.env.GRAPHQL_ENDPOINT })

const config: CodegenConfig = {
	overwrite: true,
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},

	schema: process.env.GRAPHQL_ENDPOINT,

	documents: './app/**/*.graphql',
	generates: {
		'./app/schema/generated.graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
				{
					add: {
						content: '// @ts-nocheck',
					},
				},
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
