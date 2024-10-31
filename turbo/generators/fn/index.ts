import type { PlopTypes } from '@turbo/gen'
import { defaultPrompts, withTest } from '../shared'
import { validator } from '../utils'

export const fn = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('fn', {
		description: 'Create a new function with tests (optional)',
		prompts: [
			{
				type: 'input',
				name: 'func',
				message: 'What is the name of the function?',
				validate: validator,
			},
			...defaultPrompts,
			withTest,
		],
		actions: (answers) => {
			const outputPath =
				answers?.package === 'utils'
					? 'src'
					: answers?.package === 'web'
						? 'app/utils'
						: 'src/utils'

			const actions = [
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ camelCase func }}.ts`,
					templateFile: 'fn/fn.ts.hbs',
				},
			]

			if (answers?.tests) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ camelCase func }}.test.ts`,
					templateFile: 'fn/test.ts.hbs',
				})
			}

			return actions
		},
	})
}
