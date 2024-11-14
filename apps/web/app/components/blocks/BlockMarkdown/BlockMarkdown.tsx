import * as React from 'react'
import { css } from '@spon/styled-system/css'
import type { SpacingToken } from '@spon/styled-system/tokens'
import { type ScalingToken, token } from '@spon/styled-system/tokens'
import type { TStyleProps } from '@spon/ui/type/Text'
import { Text } from '@spon/ui/type/Text'
import type {
	BlockMarkdownFragment,
	BlocksTextStylesFragment,
} from '~/schema/generated.graphql'

type VariantMap = NonNullable<TStyleProps>

export function BlockMarkdown({ markdown, style }: BlockMarkdownFragment) {
	const {
		size = 4,
		family = 'body',
		scaling,
		spaceBelow,
	} = parseTextProps(style)

	return (
		<Text
			data-testid="BlockMarkdown"
			style={{
				'--mb': safeToken(spaceBelow),
			}}
			className={css({
				mb: 'calc(var(--mb)*var(--scaling))',
			})}
			size={size}
			family={family}
			scaling={scaling}
			dangerouslySetInnerHTML={{ __html: markdown }}
		/>
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
