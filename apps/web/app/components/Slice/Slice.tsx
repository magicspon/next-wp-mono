import * as React from 'react'
import { css } from '@spon/styled-system/css'
import type { ColorToken, SpacingToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import { Stack } from '@spon/ui/layout/Stack'
import type { SliceFragment } from '~/schema/generated.graphql'

type TElementProps = React.ComponentProps<typeof Stack>

type TSliceProps = TElementProps & {
	slice: SliceFragment | null
}

function parseSliceProps(input: SliceFragment | null) {
	if (!input) return {}

	const { box, theme } = input

	const spacing = box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		acc[`--${attribute}`] = token(`spacing.${spacing as SpacingToken}`)

		return acc
	}, {})

	const colours = theme?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			colours: [colours],
		} = s

		acc[`--${attribute}`] = token(`colors.${colours as ColorToken}`)

		return acc
	}, {})

	return {
		...colours,
		...spacing,
	}
}

export function Slice({ slice, ...props }: TSliceProps) {
	return (
		<Stack
			data-testid="Slice"
			style={parseSliceProps(slice)}
			className={css({
				bg: 'var(--background)',
				alignItems: 'var(--align-items, start)',
				gap: 'var(--gap, token(spacing.12))',
				px: 'var(--padding-x, 0)',
				py: 'var(--padding-y, token(spacing.8))',
			})}
			{...props}
		/>
	)
}
