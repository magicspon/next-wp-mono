import type {
	TAdvancePortable,
	TAdvancePortableSuper,
} from '@spon/cms/queries/fragments/content.fragment'
import type { TSplitSelection } from '@spon/cms/queries/fragments/content/split.fragment'

export type TSplitBlocks = {
	split: TSplitSelection | null
	rows: TAdvancePortableSuper
	id: string
}[]

export function parseContent(content: TAdvancePortable): TSplitBlocks {
	return content.reduce<TSplitBlocks>((acc, curr, index) => {
		const counter = acc.length
		const id = curr._key
		const type = curr._type

		if (curr._type === 'split') {
			acc[counter] = { split: curr, rows: [], id }
			return acc
		}

		if (index === 0) {
			const rows = type === 'block' || type === 'links' ? [[curr]] : [curr]
			acc[0] = { split: null, rows, id }
			return acc
		}

		if (type === 'block' || type === 'links') {
			const row = acc[counter - 1]?.rows
			// keeps ts happy, but this should be impossible
			if (!row) return acc

			const length = row.length
			const cell = row[length - 1]
			const isArray = Array.isArray(cell)
			if (isArray) {
				cell.push(curr)
			} else {
				row.push([curr])
			}

			return acc
		}

		acc[counter - 1]?.rows.push(curr)

		return acc
	}, [])
}
