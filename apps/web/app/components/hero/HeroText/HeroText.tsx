import * as React from 'react'
import type { RecipeVariantProps } from '@spon/styled-system/css'
import { css, sva } from '@spon/styled-system/css'
import { Text } from '@spon/ui/type/Text'
// import { Stack } from '@spon/ui/layout/Stack'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroTextLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { section } from '~/utils/style/section'

const hero = sva({
	slots: ['root', 'content', 'text', 'markdown'],
	base: {
		root: {
			justifyContent: 'var(--hero-justify-content, start)',
			bg: 'var(--background, token(colors.teal.800))',
			color: 'var(--foreground, token(colors.white))',
			py: {
				base: 'var(--hero-padding-y, token(spacing.8))',
				md: 'var(--hero-md-padding-y, token(spacing.16))',
			},
			px: {
				base: 'var(--hero-padding-x, token(spacing.8))',
				md: 'var(--hero-md-padding-x, token(spacing.16))',
			},
		},
		content: { maxW: 'var(--hero-max-width, token(sizes.lg))', w: 'full' },
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
					alignItems: 'var(--hero-align-items, center)',
				},
				content: {},
			},
			legal: {
				root: {
					alignItems: 'var(--hero-align-items, start)',
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
		<div style={section(style?.section, 'hero')} className={classes.root}>
			<div
				style={section(textPanel?.style?.section)}
				className={classes.content}
			>
				{blocks?.map((block, index) => {
					switch (block.__typename) {
						case 'ComponentsTextPanelBlocksBodyLayout':
							return (
								<BlockBody
									body={block.body}
									textStyles={block.textStyles}
									key={index}
									components={{
										block: {
											h1: ({ children }) => (
												<Text
													asChild
													size={9}
													family="heading"
													style={{
														'--font-size': 'var(--font-size-h1)',
													}}
													className={css({
														fontSize:
															'calc(var(--font-size, token(fontSizes.8))*var(--scaling))',
													})}
												>
													<h1>{children}</h1>
												</Text>
											),
										},
									}}
								/>
							)
						case 'ComponentsTextPanelBlocksButtonsLayout':
							return <BlockButtons buttons={block.buttons} key={index} />
						case 'ComponentsTextPanelBlocksMarkdownLayout':
							return (
								<BlockMarkdown
									markdown={block.markdown}
									textStyles={block.textStyles}
									key={index}
									className={classes.markdown}
								/>
							)
						case 'ComponentsTextPanelBlocksTextLayout':
							return (
								<BlockText
									text={block.text}
									textStyles={block.textStyles}
									key={index}
									className={classes.text}
								/>
							)

						default:
							return null
					}
				})}
			</div>
		</div>
	)
}
