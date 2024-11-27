import * as React from 'react'
import { css, cx } from '@spon/styled-system/css'
import type { Text } from '@spon/ui/type/Text'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import type { ComponentsTextPanelBlocksTextLayoutFragment } from '~/schema/generated.graphql'
import { findFontSize, typography } from '~/utils/style/typography'

type TBlockBodyProps = React.ComponentProps<typeof Text> &
	ComponentsTextPanelBlocksTextLayoutFragment

export function BlockText({
	text,
	textStyles,
	className,
	tag,
}: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)
	const Comp = (getFirstOrNull(tag) as React.ElementType) ?? 'p'
	return (
		<Comp
			style={vars}
			className={cx(
				css({ textStyle: findFontSize('font-size', textStyles) }),
				className,
			)}
		>
			{text}
		</Comp>
	)
}
