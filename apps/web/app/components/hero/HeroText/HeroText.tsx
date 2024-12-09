import * as React from 'react'
import type { RecipeVariantProps } from '@spon/styled-system/css'
import { sva } from '@spon/styled-system/css'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { Block } from '~/components/blocks/Block'
import type { BaseHeroTextLayoutFragment } from '~/schema/generated.graphql'
import { createStyleFromGraphql } from '~/utils/style/createStyleFromGql'
import { section } from '~/utils/style/section'
import type { WithPT } from '~/utils/ts-helpers'
import { textPanelStyle } from '~/utils/style/textPanel'

export type HeroVariants = RecipeVariantProps<typeof hero>
type Variant = NonNullable<HeroVariants>['variant']

export type THeroTextProps = WithPT<BaseHeroTextLayoutFragment>

export function HeroText({ textPanel, style }: THeroTextProps) {
	const { blocks } = textPanel
	const { heroTextVariant } = style
	const variant = getFirstOrNull(heroTextVariant) ?? 'banner'
	const classes = hero({ variant: variant as Variant })

	console.log(JSON.stringify({ textPanel, style }))
	return (
		<div
			data-testid="HeroText"
			style={textPanelStyle(textPanel.style)}
			className={classes.root}
		>
			<div
				style={{
					...section(textPanel?.style?.section),
					...createStyleFromGraphql(textPanel.style.textAlign),
				}}
				className={classes.content}
			>
				<Block blocks={blocks} classes={classes} />
			</div>
		</div>
	)
}

export const hero = sva({
	slots: ['root', 'content', 'text', 'markdown'],
	base: {
		root: {
			display: 'flex',
			flexDir: 'column',
			justifyContent: 'var(--justify-content, center)',
			bg: 'var(--background, token(colors.blue.800))',
			color: 'var(--foreground, token(colors.white))',
			px: {
				base: 'var(--padding-x, token(spacing.8))',
				md: 'var(--md-padding-x, token(spacing.16))',
			},
		},
		content: {
			w: 'full',
			position: 'relative',
			display: 'flex',
			flexDir: 'column',
			gap: {
				base: 'var(--gap, token(spacing.6))',
				md: 'var(--md-gap, token(spacing.12))',
				lg: 'var(--lg-gap, token(spacing.12))',
			},
		},
		text: {
			color: 'var(--foreground, token(colors.white))',
			textStyle: 'display/1',
		},
		markdown: {
			_highlighted: {
				color: 'var(--accent, token(colors.accent))',
			},
			whiteSpace: 'pre-line',
		},
	},
	variants: {
		variant: {
			banner: {
				root: {
					alignItems: 'var(--align-items, center)',
					py: {
						base: 'var(--padding-y, token(spacing.8))',
						md: 'var(--md-padding-y, token(spacing.16))',
					},
				},
				content: {
					maxW: {
						base: 'var(--max-width, token(sizes.lg))',
						md: 'var(--md-max-width, token(sizes.lg))',
						lg: 'var(--lg-max-width, token(sizes.lg))',
					},
					textAlign: 'var(--text-align, center)',
					py: {
						base: 'var(--padding-y, token(spacing.24))',
						md: 'var(--md-padding-y, token(spacing.32))',
						lg: 'var(--lg-padding-y, token(spacing.56))',
					},
				},
			},
			stack: {
				root: {
					alignItems: 'var(--align-items, start)',
				},

				content: {
					maxW: {
						base: 'var(--max-width, token(sizes.lg))',
						md: 'var(--md-max-width, token(sizes.lg))',
						lg: 'var(--lg-max-width, token(sizes.lg))',
					},
					textAlign: 'var(--text-align, left)',
					pt: {
						base: 'var(--padding-t, token(spacing.24))',
						md: 'var(--md-padding-t, token(spacing.24))',
						lg: 'var(--lg-padding-t, token(spacing.48))',
					},
					pb: {
						base: 'var(--padding-b, token(spacing.8))',
						md: 'var(--md-padding-b, token(spacing.8))',
						lg: 'var(--lg-padding-b, token(spacing.8))',
					},
				},
			},
		},
	},
	defaultVariants: {
		variant: 'banner',
	},
})
