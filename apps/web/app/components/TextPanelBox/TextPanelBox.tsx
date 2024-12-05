import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import type { TSectionStyle } from '~/utils/style/section'
import { section } from '~/utils/style/section'

type TTextPanelBoxProps = React.ComponentProps<typeof Stack> & {
	theme?: TSectionStyle
}

export function TextPanelBox({ theme, ...props }: TTextPanelBoxProps) {
	return (
		<Stack
			style={section(theme)}
			className={css({
				alignItems: 'var(--hero-align-items, start)',
				justifyContent: 'var(--hero-justify-content, start)',
				gap: 'var(--hero-gap, token(spacing.4))',
				px: 'var(--hero-padding-x, token(spacing.4))',
				py: {
					base: 'var(--hero-padding-y, token(spacing.4))',
					md: 'var(--hero-md-padding-y, token(spacing.4))',
					lg: 'var(--hero-lg-padding-y, token(spacing.4))',
				},
				textAlign: 'var(--hero-text-align, left)',
				bg: 'var(--background, token(colors.black))',
				color: 'var(--foreground, token(colors.white))',
			})}
			{...props}
		/>
	)
}
