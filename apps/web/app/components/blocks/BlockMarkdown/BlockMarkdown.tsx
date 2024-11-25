import * as React from 'react'
import { Text } from '@spon/ui/type/Text'
import type { ComponentsTextPanelBlocksMarkdownLayoutFragment } from '~/schema/generated.graphql'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = React.ComponentProps<typeof Text> &
	ComponentsTextPanelBlocksMarkdownLayoutFragment

export function BlockMarkdown({
	markdown,
	textStyles,
	...props
}: TBlockBodyProps) {
	const { vars, fontFamily } = typography(textStyles?.typography)

	return (
		<Text
			data-testid="BlockMarkdown"
			style={vars}
			family={fontFamily}
			{...props}
			dangerouslySetInnerHTML={{ __html: markdown }}
		/>
	)
}
