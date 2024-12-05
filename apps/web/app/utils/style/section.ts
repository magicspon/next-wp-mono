import type {
	BaseHeroStyleSectionFragment,
	BaseStructureSectionFragment,
	BaseStructureTextBlocksSectionFragment,
	BlogStructureSectionFragment,
	BlogStructureTextBlocksSectionFragment,
	ComponentsTextPanelStyleSectionFragment,
} from '~/schema/generated.graphql'
import {
	createColors,
	createSpacing,
	createStyleFromGraphql,
	createWidths,
} from './createStyleFromGql'

export type TSectionStyle =
	| BaseStructureSectionFragment
	| BaseStructureTextBlocksSectionFragment
	| BlogStructureSectionFragment
	| BlogStructureTextBlocksSectionFragment
	| ComponentsTextPanelStyleSectionFragment
	| BaseHeroStyleSectionFragment

export function section(input?: TSectionStyle, prefix?: string) {
	if (!input) return

	return {
		...createColors(input?.theme),
		...createSpacing(input?.box, prefix),
		...createStyleFromGraphql(input?.align, prefix),
		...createStyleFromGraphql(input?.justify, prefix),
		...createWidths(input?.width, prefix),
	}
}
