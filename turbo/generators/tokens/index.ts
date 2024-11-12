import type { PlopTypes } from '@turbo/gen'
import fs from 'node:fs'
import path from 'node:path'
import { validator } from '../utils'
import type { AcfTokenFields } from './acf.type'

// import { to}

//group_672b9c31e7090.json

export const syncTokens = (plop: PlopTypes.NodePlopAPI) => {
	plop.setGenerator('tokens', {
		description: 'Sync design system tokens with ACF tokens',
		prompts: [
			{
				type: 'input',
				name: 'theme',
				message: 'What is the wp theme name',
				validate: validator,
				default: 'twentytwentyfour',
			},
			{
				type: 'input',
				name: 'input',
				message: 'What is the acf json file name',
				validate: validator,
				default: 'group_672b9c31e7090',
			},
			{
				type: 'input',
				name: 'field',
				message: 'What is the field name',
				validate: validator,
			},
			{
				type: 'list',
				name: 'folder',
				message: 'What folder should we use',
				choices: ['colours', 'typography', 'spacing', 'raduis', 'grid'],
			},
		],
		actions: (answers) => {
			const actions: PlopTypes.PlopGeneratorConfig['actions'] = []
			if (!answers) return actions
			const acfDirectory = `apps/cms/web/app/themes/${answers.theme}/acf-json`
			const tmpDir = `apps/cms`
			const cwd = process.cwd()
			const acfPath = path.join(cwd, `${acfDirectory}/${answers.input}.json`)
			const acfContent = fs.readFileSync(acfPath, 'utf-8')
			const acfData = JSON.parse(acfContent) as AcfTokenFields
			const field = acfData.fields.map((f) => {
				if (f.name === answers.field) {
					const choices = {
						afab: 'b',
					}

					// @ts-expect-error we got some strict key names in the type transforms
					f.choices = choices
				}
				return f
			})

			fs.writeFileSync(
				`${tmpDir}/tmp.${answers.input}.${answers.field}.json`,
				JSON.stringify(field),
				'utf8',
			)

			return actions
		},
	})
}
