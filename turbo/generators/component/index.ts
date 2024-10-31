import type { PlopTypes } from '@turbo/gen'
import { defaultPrompts, withTest } from '../shared'
import { getDirectories, validator } from '../utils'

export const component = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('component', {
		description: 'Create a new component with tests and stories (optional)',
		prompts: [
			{
				type: 'input',
				name: 'func',
				message: 'What is the component of the function?',
				validate: validator,
			},
			...defaultPrompts,
			{
				type: 'list',
				name: 'folder',
				message: 'What folder should we use',
				when: (answers) => answers.package === 'ui', // Show only if func is 'ui'
				validate: (input) => (input ? true : 'Subtitle cannot be empty'), // Optional validation
				choices: getDirectories('packages/ui/src'),
			},
			withTest,
			{
				type: 'confirm',
				name: 'stories',
				message: 'Do you want to include a story?',
				default: 'no',
			},
			{
				type: 'confirm',
				name: 'client',
				message: 'Is this a client component',
				default: 'no',
			},
			{
				type: 'confirm',
				name: 'variants',
				message: 'Do you want to use cva',
				default: 'no',
			},
			{
				type: 'confirm',
				name: 'forwardRef',
				message: 'Do you need to forward refs',
				default: 'no',
			},
		],
		actions: (answers) => {
			const outputPath =
				answers?.package === 'ui'
					? `src/${answers?.folder}`
					: answers?.package === 'web'
						? 'app/components'
						: 'src/components'

			console.log({ outputPath })

			const actions = [
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.tsx`,
					templateFile: 'component/component.ts.hbs',
				},
				{
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/index.ts`,
					templateFile: 'component/index.ts.hbs',
				},
			]

			if (answers?.tests) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.test.tsx`,
					templateFile: 'component/component.test.ts.hbs',
				})
			}
			if (answers?.stories) {
				actions.push({
					type: 'add',
					path: `{{ turbo.paths.root }}/{{ directory }}/{{ package }}/${outputPath}/{{ pascalCase func }}/{{ pascalCase func }}.stories.tsx`,
					templateFile: 'component/component.stories.ts.hbs',
				})
			}

			return actions
		},
	})
}
