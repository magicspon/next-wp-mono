import * as React from 'react'
import type { RecipeVariantProps } from '@spon/styled-system/css'
import { sva } from '@spon/styled-system/css'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { Block } from '~/components/blocks/Block'
import type { BaseHeroTextLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { section } from '~/utils/style/section'

const hero = sva({
	slots: ['root', 'content', 'text', 'markdown'],
	base: {
		root: {
			display: 'flex',
			flexDir: 'column',
			justifyContent: 'var(--justify-content, start)',
			bg: 'var(--background, token(colors.teal.800))',
			color: 'var(--foreground, token(colors.white))',
			py: {
				base: 'var(--padding-y, token(spacing.8))',
				md: 'var(--md-padding-y, token(spacing.16))',
			},
			px: {
				base: 'var(--padding-x, token(spacing.8))',
				md: 'var(--md-padding-x, token(spacing.16))',
			},
		},
		content: {
			maxW: 'var(--max-width, token(sizes.lg))',
			w: 'full',
			display: 'flex',
			flexDir: 'column',
			gap: {
				base: 'var(--gap, token(spacing.6))',
				md: 'var(--md-gap, token(spacing.8))',
			},
		},
		text: {
			color: 'var(--foreground, token(colors.white))',
		},
		markdown: {
			_highlight: {
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
				},
				content: {},
			},
			legal: {
				root: {
					alignItems: 'var(--align-items, start)',
				},
				content: { width: '10', height: '10' },
			},
		},
	},
	defaultVariants: {
		variant: 'banner',
	},
})

export type HeroVariants = RecipeVariantProps<typeof hero>
type Variant = NonNullable<HeroVariants>['variant']

type THeroTextProps = WithPT<BaseHeroTextLayoutFragment>

export function HeroText({ textPanel, style }: THeroTextProps) {
	const { blocks } = textPanel
	const { heroTextVariant } = style
	const variant = getFirstOrNull(heroTextVariant) ?? 'banner'
	const classes = hero({ variant: variant as Variant })

	return (
		<div
			data-testid="HeroText"
			style={section(style?.section)}
			className={classes.root}
		>
			<div
				style={section(textPanel?.style?.section)}
				className={classes.content}
			>
				<Block blocks={blocks} classes={classes} />
			</div>
		</div>
	)
}
