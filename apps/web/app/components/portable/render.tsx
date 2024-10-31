import {
	PortableText,
	type PortableTextBlockComponent,
	type PortableTextMarkComponent,
	type PortableTextTypeComponent,
} from 'next-sanity'
import * as React from 'react'
import type { TAdvancePortableSuper } from '@spon/cms/queries/fragments/content.fragment'
import type { TSplitSelection } from '@spon/cms/queries/fragments/content/split.fragment'
import * as Portable from '~/components/layouts/PortableWrapper'

export type TPortableBlockProps = {
	split?: TSplitSelection | null
	id: string
	rows: TAdvancePortableSuper

	links: Record<string, PortableTextTypeComponent>
	types: Record<string, PortableTextTypeComponent>
	marks: Record<string, PortableTextMarkComponent>
	block: PortableTextBlockComponent | Record<string, PortableTextBlockComponent>
}

export function PortableBlock({
	split,
	id,
	rows,
	types,
	marks,
	block,
	links,
}: TPortableBlockProps) {
	return (
		<Portable.Group shouldSplit={!!split} theme={split?.theme} key={id}>
			{rows.map((row) =>
				Array.isArray(row) ? (
					<Portable.Wrapper
						contain={split?.contain ?? 'default'}
						variant={split?.variant}
						key={`${id}::${row[0]?._key}`}
					>
						{row.map((node) => (
							<PortableText
								key={node._key}
								value={node}
								components={{
									types: links,
									marks,
									block,
								}}
							/>
						))}
					</Portable.Wrapper>
				) : (
					<PortableText key={row._key} value={row} components={{ types }} />
				),
			)}
		</Portable.Group>
	)
}
