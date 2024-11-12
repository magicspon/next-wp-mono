import * as React from 'react'
import { css } from '@spon/styled-system/css'
import type { SpacingToken } from '@spon/styled-system/tokens'
import { type ScalingToken, token } from '@spon/styled-system/tokens'
import type { TStyleProps } from '@spon/ui/type/Text'
import { Text } from '@spon/ui/type/Text'
import type {
	BlocksTextStylesFragment,
	TextPanelBlocksTextFragment,
} from '~/schema/generated.graphql'

type VariantMap = NonNullable<TStyleProps>

export function BlockText({ text, style }: TextPanelBlocksTextFragment) {
	const {
		size = 4,
		family = 'body',
		scaling,
		spaceBelow,
	} = parseTextProps(style)

	return (
		<Text
			style={{
				'--mb': safeToken(spaceBelow),
			}}
			className={css({
				mb: 'calc(var(--mb)*var(--scaling))',
			})}
			size={size}
			family={family}
			scaling={scaling}
		>
			{text}
		</Text>
	)
}

function parseTextProps(input: Omit<BlocksTextStylesFragment, '__typename'>) {
	const styles = Object.fromEntries(
		Object.entries(input).map(([k, v]) => [k, v?.[0]]),
	) as {
		size: VariantMap['size'] | undefined
		family: VariantMap['family'] | undefined
		scaling: ScalingToken | undefined
		spaceBelow: SpacingToken | undefined
	}

	return styles
}

const safeToken = (value?: SpacingToken) =>
	value ? token(`spacing.${value}`) : ''
