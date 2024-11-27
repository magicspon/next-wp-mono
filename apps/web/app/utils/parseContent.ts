import type {
	BaseStructureMixedColumnsLayoutFragment,
	BaseStructureSliceLayoutFragment,
	BaseStructureTextColumnsLayoutFragment,
	BaseStructureTextLayoutFragment,
	BlogStructureMixedColumnsLayoutFragment,
	BlogStructureSliceLayoutFragment,
	BlogStructureTextColumnsLayoutFragment,
	BlogStructureTextLayoutFragment,
} from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/ts-helpers'

type TBlock =
	| BlogStructureTextLayoutFragment
	| BlogStructureTextColumnsLayoutFragment
	| BlogStructureMixedColumnsLayoutFragment
	| BaseStructureTextLayoutFragment
	| BaseStructureTextColumnsLayoutFragment
	| BaseStructureMixedColumnsLayoutFragment

type PageRow =
	| WithPT<TBlock>
	| BlogStructureSliceLayoutFragment
	| BaseStructureSliceLayoutFragment

type RowType = PageRow
type SliceFragment =
	| BlogStructureSliceLayoutFragment
	| BaseStructureSliceLayoutFragment

export type StructureProps = {
	slice: SliceFragment | null
	rows: RowType[]
	id: string
}[]

export function parseContent(content: RowType[]): StructureProps {
	if (!content?.length) return []

	return content.reduce<StructureProps>((acc, curr, index) => {
		const counter = acc.length
		const id = `${curr.__typename}-${index}`

		if (curr.__typename === 'BaseStructureSliceLayout') {
			acc[counter] = { slice: curr, rows: [], id }
			return acc
		}

		if (index === 0) {
			const rows = [curr]
			acc[0] = { slice: null, rows, id }
			return acc
		}

		acc[counter - 1]?.rows.push(curr)

		return acc
	}, [])
}
