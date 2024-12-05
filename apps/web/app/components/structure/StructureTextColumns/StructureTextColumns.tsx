import * as React from 'react'
import { Block } from '~/components/blocks/Block'
import type {
	BaseStructureTextColumnsLayoutFragment,
	BlogStructureTextColumnsLayoutFragment,
	ContentColumnsBlocksTextPanelFragment,
} from '~/schema/generated.graphql'
import { group } from '~/utils/style/group'
import { section } from '~/utils/style/section'
import type { WithPT } from '~/utils/ts-helpers'

function Column({
	column,
}: {
	column: WithPT<ContentColumnsBlocksTextPanelFragment>
}) {
	const { blocks, style } = column

	console.log({ '[Column/style]': style })

	return (
		<div style={section(style.section)}>
			<Block blocks={blocks} />
		</div>
	)
}

export function StructureTextColumns({
	columns,
}:
	| WithPT<BaseStructureTextColumnsLayoutFragment>
	| WithPT<BlogStructureTextColumnsLayoutFragment>) {
	const { style, blocks } = columns

	const textColumns = blocks?.map((c) => c.textPanel)

	if (!textColumns) return null

	console.log({ '[StructureTextColumns/style]': style })

	return (
		<div style={group(style.group)} data-testid="StructureTextColumns">
			{textColumns.map((column, i) => (
				<Column key={i} column={column} />
			))}
		</div>
	)
}
