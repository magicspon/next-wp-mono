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
	BlogTeaserBlocks_LayoutFragment,
	ComponentsTextPanelBlocks_LayoutFragment,
} from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { BlockImage } from '../BlockImage'

type Comp<T extends React.ComponentType<any>> = React.ComponentType<
	React.ComponentProps<T>
>

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
	portable?: PortableProps['components']
	blocks: WithPT<TBlockData[]>
	components?: {
		text?: Comp<typeof BlockText>
		markdown?: Comp<typeof BlockMarkdown>
		buttons?: Comp<typeof BlockButtons>
		body?: Comp<typeof BlockBody>
		image?: Comp<typeof BlockImage>
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
						return (
							<Body
								key={index}
								body={block.body}
								textStyles={block.textStyles}
								components={portable}
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
