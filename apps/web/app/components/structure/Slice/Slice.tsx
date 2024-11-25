import * as React from 'react'
import { css } from '@spon/styled-system/css'
import type { SpacingToken } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'
import { Stack } from '@spon/ui/layout/Stack'
import type {
	BaseStructureSliceLayoutFragment,
	BlogStructureSliceLayoutFragment,
} from '~/schema/generated.graphql'

type TElementProps = React.ComponentProps<typeof Stack>

type TSlice =
	| BaseStructureSliceLayoutFragment['section']
	| BlogStructureSliceLayoutFragment['section']

type TSliceProps = TElementProps & {
	slice?: TSlice | null
}

function parseSliceProps(input?: TSlice | null) {
	if (!input) return {}

	const { box } = input

	const spacing = box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		acc[`--${attribute}`] = token(`spacing.${spacing as SpacingToken}`)

		return acc
	}, {})

	// const colours = theme?.reduce<Record<string, string>>((acc, s) => {
	// 	const {
	// 		attribute: [attribute],
	// 		colours: [colours],
	// 	} = s

	// 	acc[`--${attribute}`] = token(`colors.${colours as ColorToken}`)

	// 	return acc
	// }, {})

	return {
		// ...colours,
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
				alignItems: 'var(--align-items, stretch)',
				gap: 'var(--gap, token(spacing.12))',
				px: 'var(--padding-x, 0)',
				py: 'var(--padding-y, token(spacing.8))',
			})}
			{...props}
		/>
	)
}
