import * as React from 'react'
import type { TAdvancePortable } from '@spon/cms/queries/fragments/content.fragment'
import type { TBlogDocument } from '@spon/cms/queries/selection/blog.selection'
import type { TTeaserSelection } from '@spon/cms/queries/selection/post.selection'
import { Container } from '@spon/ui/layout/Container'
import { Stack } from '@spon/ui/layout/Stack'
import { PostFeed } from '~/components/PostFeed'
// import { Debug } from '~/components/Debug'
import { block } from '~/components/portable/block'
import { links } from '~/components/portable/links'
import { marks } from '~/components/portable/marks'
import { PortableBlock } from '~/components/portable/render'
import { types } from '~/components/portable/types'
import { parseContent } from '~/utils/parseContent'

type TBlogListProps = TBlogDocument & {
	posts: TTeaserSelection[]
	total: number
}

export function BlogList({ content, posts, total }: TBlogListProps) {
	const blocks = parseContent(content as TAdvancePortable)
	const [hero, ...extra] = blocks
	const hasExtraRows = extra.length > 0

	return (
		<Stack className="gap-12 py-6">
			{hero && (
				<PortableBlock
					id={hero.id}
					rows={hero.rows}
					split={hero.split}
					types={types}
					links={links}
					marks={marks}
					block={block}
				/>
			)}

			<Container center gutter>
				<PostFeed total={total} posts={posts} />
			</Container>

			{hasExtraRows &&
				extra
					.filter(({ rows }) => rows.length)
					.map(({ rows, id, split }) => (
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
		</Stack>
	)
}
