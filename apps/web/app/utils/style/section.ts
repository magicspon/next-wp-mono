import type { SpacingToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import type {
	BaseStructureSectionFragment,
	BaseStructureTextBlocksSectionFragment,
	BlogStructureSectionFragment,
	BlogStructureTextBlocksSectionFragment,
	ComponentsTextPanelStyleSectionFragment,
} from '~/schema/generated.graphql'

type StyleProps = {
	value: string[]
	attribute: string[]
}[]

function createStyleFromGraphqlInput(input?: StyleProps, namespace = '') {
	if (!input) return null

	return input?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			value: [value],
		} = s

		if (!value || !attribute) return acc

		const name = namespace ? `${namespace}-${attribute}` : attribute

		acc[`--${name}`] = value

		return acc
	}, {})
}

export type TSectionStyle =
	| BaseStructureSectionFragment
	| BaseStructureTextBlocksSectionFragment
	| BlogStructureSectionFragment
	| BlogStructureTextBlocksSectionFragment
	| ComponentsTextPanelStyleSectionFragment

export function section(input?: TSectionStyle) {
	if (!input) return
	const spacing = input.box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		acc[`--hero-${attribute}`] = token(`spacing.${spacing as SpacingToken}`)

		return acc
	}, {})
	const align = createStyleFromGraphqlInput(input?.align, 'hero')
	const justify = createStyleFromGraphqlInput(input?.justify, 'hero')

	return {
		...spacing,
		...align,
		...justify,
	}
}
