import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Text } from '@spon/ui/type/Text'
import type { ComponentsTextPanelBlocksMarkdownLayoutFragment } from '~/schema/generated.graphql'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = ComponentsTextPanelBlocksMarkdownLayoutFragment

export function BlockMarkdown({ markdown, style }: TBlockBodyProps) {
	return (
		<Text
			data-testid="BlockMarkdown"
			style={typography(style?.typography)}
			className={css({
				mb: 'calc(var(--mb) * var(--scaling))',
				_highlight: { color: 'var(--accent, token(colors.accent))' },
				whiteSpace: 'pre-line',
			})}
			dangerouslySetInnerHTML={{ __html: markdown }}
		/>
	)
}
