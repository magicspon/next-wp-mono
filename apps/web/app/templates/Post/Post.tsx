import * as React from 'react'
import type { TAdvancePortable } from '@spon/cms/queries/fragments/content.fragment'
import type { TPostDocument } from '@spon/cms/queries/selection/post.selection'
// import { Debug } from '~/components/Debug'
import { block } from '~/components/portable/block'
import { links } from '~/components/portable/links'
import { marks } from '~/components/portable/marks'
import { PortableBlock } from '~/components/portable/render'
import { types } from '~/components/portable/types'
import { parseContent } from '~/utils/parseContent'

export function Post({ content }: TPostDocument) {
	const blocks = parseContent(content as TAdvancePortable)

	return (
		<>
			{/* <Debug blocks={blocks} /> */}
			{blocks.map(({ rows, id, split }) => (
				<PortableBlock
					id={id}
					key={id}
					rows={rows}
					split={split}
					types={types}
					links={links}
					marks={marks}
					block={block}
				/>
			))}
		</>
	)
}
