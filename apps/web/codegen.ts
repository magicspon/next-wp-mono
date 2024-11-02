import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},
	schema: 'http://cms.ddev.site/wp/graphql',

	documents: 'app/**/*.graphql',
	generates: {
		'app/schema/graphql.ts': {
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
