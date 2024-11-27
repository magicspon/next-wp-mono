import * as React from 'react'
import { css, cx } from '@spon/styled-system/css'
import type { Text } from '@spon/ui/type/Text'
import type { ComponentsTextPanelBlocksMarkdownLayoutFragment } from '~/schema/generated.graphql'
import { findFontSize, typography } from '~/utils/style/typography'

type TBlockBodyProps = React.ComponentProps<typeof Text> &
	ComponentsTextPanelBlocksMarkdownLayoutFragment

export function BlockMarkdown({
	markdown,
	textStyles,
	className,
}: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)

	const Comp = 'p'

	return (
		<Comp
			data-testid="BlockMarkdown"
			style={vars}
			className={cx(
				css({ textStyle: findFontSize('font-size', textStyles) }),
				className,
			)}
			dangerouslySetInnerHTML={{ __html: markdown }}
		/>
	)
}
