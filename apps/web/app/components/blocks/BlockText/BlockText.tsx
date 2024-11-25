import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Text } from '@spon/ui/type/Text'
import type { ComponentsTextPanelBlocksTextLayoutFragment } from '~/schema/generated.graphql'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = ComponentsTextPanelBlocksTextLayoutFragment

export function BlockText({ text, style }: TBlockBodyProps) {
	return (
		<Text
			data-testid="BlockText"
			style={typography(style?.typography)}
			className={css({
				mb: 'calc(var(--mb)*var(--scaling))',
			})}
		>
			{text}
		</Text>
	)
}
