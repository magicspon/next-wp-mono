import { css } from '@spon/styled-system/css'
import type { FontSizeToken, SpacingToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import { Stack } from '@spon/ui/layout/Stack'
import { Portable } from '~/components/Portable'
import type {
	TextPanelBlocksBodyFragment,
	TextPanelStyleBodyFragment, // TextPanelStyleFragment,
} from '~/schema/generated.graphql'
import type { WithPortableText } from '~/utils/portable/htmlToPortableText'

export function BlockBody({
	body,
	style,
}: WithPortableText<TextPanelBlocksBodyFragment>) {
	return (
		<Stack
			style={parseBodyProps(style)}
			className={css({
				alignItems: 'var(--align-items, start)',
				gap: 'var(--gap, token(spacing.4))',
				px: 'var(--padding-x, token(spacing.4))',
				py: 'var(--padding-y, token(spacing.4))',
			})}
		>
			<Portable body={body} />
		</Stack>
	)
}

function parseBodyProps({ textSizes, box }: TextPanelStyleBodyFragment) {
	const fontSizes = textSizes?.reduce<Record<string, string>>((acc, s) => {
		const {
			style: [style],
			fontSize: [fontSize],
		} = s

		acc[`--font-size-${style}`] = token(
			`fontSizes.${fontSize as FontSizeToken}`,
		)

		return acc
	}, {})

	const spacing = box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		acc[`--${attribute}`] = token(`spacing.${spacing as SpacingToken}`)

		return acc
	}, {})

	return {
		...fontSizes,
		...spacing,
	}
}
