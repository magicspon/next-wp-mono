import type {
	MixedColumnsStructureFragment,
	SliceFragment,
	TextColumnsStructureFragment,
	TextStructureFragment,
} from '~/schema/generated.graphql'
import type { WithPortableText } from './portable/htmlToPortableText'

type RowType =
	| WithPortableText<TextStructureFragment>
	| WithPortableText<TextColumnsStructureFragment>
	| WithPortableText<MixedColumnsStructureFragment>
	| SliceFragment

export type StructureProps = {
	slice: SliceFragment | null
	rows: RowType[]
	id: string
}[]

export function parseContent(content: RowType[]): StructureProps {
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
