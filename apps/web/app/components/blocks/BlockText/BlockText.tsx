import * as React from 'react'
import { Text } from '@spon/ui/type/Text'
import type { ComponentsTextPanelBlocksTextLayoutFragment } from '~/schema/generated.graphql'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = React.ComponentProps<typeof Text> &
	ComponentsTextPanelBlocksTextLayoutFragment

export function BlockText({ text, textStyles, ...props }: TBlockBodyProps) {
	const { vars, fontFamily } = typography(textStyles?.typography)
	return (
		<Text size={4} family={fontFamily} style={vars} {...props}>
			{text}
		</Text>
	)
}
