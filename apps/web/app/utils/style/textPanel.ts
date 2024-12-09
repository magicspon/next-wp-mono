import type { RemoveTypename } from '../ts-helpers'
import type {
	ComponentsTextPanelStyleScaleFragment,
	ComponentsTextPanelStyleTextAlignFragment,
} from './../../schema/generated.graphql'
import { createScale, createStyleFromGraphql } from './createStyleFromGql'
import { section, type TSectionStyle } from './section'

type TTextPanelProps = {
	section: TSectionStyle
	textAlign: RemoveTypename<ComponentsTextPanelStyleTextAlignFragment>[]
	scale: RemoveTypename<ComponentsTextPanelStyleScaleFragment>[]
}

export function textPanelStyle(style: TTextPanelProps, prefix?: string) {
	//

	return {
		...section(style?.section),
		...createStyleFromGraphql(style?.textAlign, prefix),
		...createScale(style?.scale),
	}
}
