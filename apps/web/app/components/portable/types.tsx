import { PortableText } from 'next-sanity'
import { type TSimplePortable } from '@spon/cms/queries/fragments/content.fragment'
import type { TBlocks } from '@spon/cms/queries/fragments/content/blocks.fragment'
import type { TForm } from '@spon/cms/queries/fragments/content/form.fragment'
import type { TRelated } from '@spon/cms/queries/fragments/content/related.fragment'
import type { TContentLayout } from '@spon/cms/queries/fragments/content/shared.fragment'
import { Asset } from '~/components/Asset'
// import { Debug } from '~/components/Debug'
import { Palette } from '~/components/Palette'
import {
	type Variants,
	content,
	item,
	media,
	root,
	wrapper,
} from '~/components/layouts/variants'
import { block as coreBlock } from '~/components/portable/block'
import { banner } from '~/components/portable/blocks/banner'
import { block } from '~/components/portable/blocks/block'
import { card } from '~/components/portable/blocks/card'
import { links } from '~/components/portable/links'
import { marks } from '~/components/portable/marks'
import type { TPortableBlock } from '~/types/helpers'
import type { TBlockStyle } from '~/types/helpers'

export const data: Record<TContentLayout, TBlockStyle> = {
	card,
	block,
	banner,
}

export function getBlocks(layout: TContentLayout) {
	return data[layout]
}

type BlogBlockTypes =
	| TPortableBlock<TBlocks>
	| TPortableBlock<TRelated>
	| TPortableBlock<TForm>

export const types: BlogBlockTypes = {
	blocks: ({ value }) => {
		const layoutProps: Variants = {
			layout: value.layout,
			variant: 'home',
			component: 'blocks',
		} as const

		return (
			<Palette asChild theme={value.theme}>
				<div className={root(layoutProps)}>
					<div className={wrapper(layoutProps)}>
						{value.items?.map((node) => (
							<div key={node._key} className={item(layoutProps)}>
								{node.media && (
									<div className={media(layoutProps)}>
										<Asset {...node.media} {...layoutProps} />
									</div>
								)}
								<div className={content(layoutProps)}>
									<PortableText
										value={node.richText as TSimplePortable}
										components={{
											types: links,
											marks,
											block: getBlocks(value.layout),
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</Palette>
		)
	},

	related: ({ value }) => {
		const layoutProps: Variants = {
			layout: value.layout,
			variant: 'home',
			component: 'related',
		} as const
		return (
			<Palette className="mx-esc" theme={value.theme}>
				<div className={root(layoutProps)}>
					<div className={wrapper(layoutProps)}>
						{value.items?.map((node) => (
							<div key={node._id} className={item(layoutProps)}>
								{node.teaser?.image && (
									<div className={media(layoutProps)}>
										{/* <Debug image={node.teaser.image} /> */}
									</div>
								)}
								<div className={content(layoutProps)}>
									<PortableText
										value={node.teaser?.content as TSimplePortable}
										components={{
											types: links,
											marks,
											block: coreBlock,
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</Palette>
		)
	},
	form: ({ value }) => {
		return (
			<>
				<pre className="sr-only">
					{JSON.stringify({ form: value }, null, 2)}
				</pre>
			</>
		)
	},
	...links,
}
