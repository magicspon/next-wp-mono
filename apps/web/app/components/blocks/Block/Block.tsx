import * as React from 'react'
import type { PortableProps } from '~/components/Portable'
import { BlockBody } from '~/components/blocks/BlockBody'
import { BlockButtons } from '~/components/blocks/BlockButtons'
import { BlockMarkdown } from '~/components/blocks/BlockMarkdown'
import { BlockText } from '~/components/blocks/BlockText'
import type {
	BaseStructureTextBlocksBlocks_LayoutFragment,
	BaseTeaserBlocks_LayoutFragment,
	BlogStructureTextBlocksBlocks_LayoutFragment,
	BlogTeaserBlocksBodyLayoutFragment,
	BlogTeaserBlocks_LayoutFragment,
	ComponentsTextPanelBlocks_LayoutFragment,
} from '~/schema/generated.graphql'
import type {
	RemoveTypename,
	TComponentAsProp,
	WithPT,
} from '~/utils/ts-helpers'
import { BlockImage } from '../BlockImage'

type TBlockData =
	| BaseStructureTextBlocksBlocks_LayoutFragment
	| BlogStructureTextBlocksBlocks_LayoutFragment
	| ComponentsTextPanelBlocks_LayoutFragment
	| BaseTeaserBlocks_LayoutFragment
	| BlogTeaserBlocks_LayoutFragment

type TBlockProps = {
	classes?: {
		markdown?: string
		text?: string
		image?: string
		body?: string
		buttons?: string
	}
	portable?: (
		style: RemoveTypename<BlogTeaserBlocksBodyLayoutFragment['textStyles']>,
	) => PortableProps['components']
	blocks: WithPT<TBlockData[]>
	components?: {
		text?: TComponentAsProp<typeof BlockText>
		markdown?: TComponentAsProp<typeof BlockMarkdown>
		buttons?: TComponentAsProp<typeof BlockButtons>
		body?: TComponentAsProp<typeof BlockBody>
		image?: TComponentAsProp<typeof BlockImage>
	}
}

export function Block({
	blocks,
	portable,
	components = {},
	classes = {},
}: TBlockProps) {
	return (
		<>
			{blocks?.map((block, index) => {
				switch (block.__typename) {
					case 'BlogTeaserBlocksBodyLayout':
					case 'BlogStructureTextBlocksBlocksBodyLayout':
					case 'BaseTeaserBlocksBodyLayout':
					case 'BaseStructureTextBlocksBlocksBodyLayout':
					case 'ComponentsTextPanelBlocksBodyLayout': {
						const Body = components?.body ?? BlockBody
						const portableComponents = portable
							? portable(block.textStyles)
							: undefined
						return (
							<Body
								key={index}
								body={block.body}
								layout={block.layout}
								textStyles={block.textStyles}
								components={portableComponents}
								className={classes.body}
							/>
						)
					}

					case 'BlogTeaserBlocksButtonsLayout':
					case 'BlogStructureTextBlocksBlocksButtonsLayout':
					case 'BaseTeaserBlocksButtonsLayout':
					case 'BaseStructureTextBlocksBlocksButtonsLayout':
					case 'ComponentsTextPanelBlocksButtonsLayout': {
						const Buttons = components?.buttons ?? BlockButtons
						return (
							<Buttons
								key={index}
								buttons={block.buttons}
								className={classes.buttons}
							/>
						)
					}

					case 'BlogTeaserBlocksMarkdownLayout':
					case 'BlogStructureTextBlocksBlocksMarkdownLayout':
					case 'BaseTeaserBlocksMarkdownLayout':
					case 'BaseStructureTextBlocksBlocksMarkdownLayout':
					case 'ComponentsTextPanelBlocksMarkdownLayout': {
						const Markdown = components?.markdown ?? BlockMarkdown
						return (
							<Markdown
								key={index}
								tag={block.tag}
								markdown={block.markdown}
								textStyles={block.textStyles}
								className={classes.markdown}
							/>
						)
					}

					case 'BlogTeaserBlocksTextLayout':
					case 'BlogStructureTextBlocksBlocksTextLayout':
					case 'BaseTeaserBlocksTextLayout':
					case 'BaseStructureTextBlocksBlocksTextLayout':
					case 'ComponentsTextPanelBlocksTextLayout': {
						const Text = components?.text ?? BlockText
						return (
							<Text
								key={index}
								tag={block.tag}
								text={block.text}
								textStyles={block.textStyles}
								className={classes.text}
							/>
						)
					}

					case 'BlogTeaserBlocksImageLayout':
					case 'BlogStructureTextBlocksBlocksImageLayout':
					case 'BaseTeaserBlocksImageLayout':
					case 'BaseStructureTextBlocksBlocksImageLayout':
					case 'ComponentsTextPanelBlocksImageLayout': {
						const Image = components?.image ?? BlockImage
						return <Image key={index} className={classes.image} />
					}

					default:
						return null
				}
			})}
		</>
	)
}
