import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type { BaseHeroTextLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { section } from '~/utils/style/section'

type THeroTextProps = WithPT<BaseHeroTextLayoutFragment>

export function HeroText({ textPanel, style }: THeroTextProps) {
	const { blocks } = textPanel

	return (
		<Stack
			style={section(style?.section, 'hero')}
			className={css({
				alignItems: 'var(--hero-align-items, center)',
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
			})}
		>
			<div
				style={section(textPanel?.style?.section)}
				className={css({
					maxW: 'var(--hero-max-width, token(sizes.lg))',
					w: 'full',
				})}
			>
				{blocks?.map((block, index) => {
					switch (block.__typename) {
						case 'ComponentsTextPanelBlocksBodyLayout':
							return (
								<BlockBody
									body={block.body}
									textStyles={block.textStyles}
									key={index}
								/>
							)
						case 'ComponentsTextPanelBlocksButtonsLayout':
							return <BlockButtons {...block} key={index} />
						case 'ComponentsTextPanelBlocksMarkdownLayout':
							return (
								<BlockMarkdown
									markdown={block.markdown}
									textStyles={block.textStyles}
									key={index}
									className={css({
										_highlight: {
											color: 'var(--accent, token(colors.accent))',
										},
										whiteSpace: 'pre-line',
									})}
								/>
							)
						case 'ComponentsTextPanelBlocksTextLayout':
							return (
								<BlockText
									text={block.text}
									textStyles={block.textStyles}
									key={index}
									className={css({
										color: 'var(--foreground, token(colors.white))',
									})}
								/>
							)

						default:
							return null
					}
				})}
			</div>
		</Stack>
	)
}
