import { describe, expect, it, vi } from 'vitest'
import type { TAdvancePortable } from '@spon/cms/queries/fragments/content.fragment'
import type { TBlocks } from '@spon/cms/queries/fragments/content/blocks.fragment'
import type { TRelated } from '@spon/cms/queries/fragments/content/related.fragment'
import type { TBlockRichText } from '@spon/cms/queries/fragments/content/richText.fragment'
import type { TSplitSelection } from '@spon/cms/queries/fragments/content/split.fragment'
import type { TLinksSelection } from '@spon/cms/queries/fragments/link.fragment'
import * as Fn from './parseContent'

const block = {
	_type: 'block',
	_key: '1',
	children: [],
	markDefs: [],
} satisfies TBlockRichText

const blocks = {
	_type: 'blocks',
	_key: '2',
	theme: null,
	layout: 'block',
	items: [],
} satisfies TBlocks

const related = {
	_type: 'related',
	_key: '3',
	theme: null,
	layout: 'block',
	items: [],
} satisfies TRelated

const links = {
	_type: 'links',
	_key: '4',
	layout: 'stack',
	links: [],
} satisfies TLinksSelection

const split = {
	_type: 'split',
	_key: '5',
	theme: null,
	variant: 'banner',
	contain: 'default',
} satisfies TSplitSelection

const data = [
	block,
	links,
	split,
	block,
	blocks,
	related,
] satisfies TAdvancePortable

describe('createBlocks', async () => {
	it('should be invoked', async () => {
		const getLegsSpy = vi.spyOn(Fn, 'parseContent')
		Fn.parseContent(data)

		expect(getLegsSpy).toHaveBeenCalled()
	})

	it('should split the content into the correct number of groups', async () => {
		let output = Fn.parseContent([block, links, split, block, blocks, related])
		expect(output.length).toBe(2)

		output = Fn.parseContent([
			block,
			links,
			split,
			block,
			blocks,
			split,
			related,
		])
		expect(output.length).toBe(3)
	})

	it('should group text and link blocks into a single row', async () => {
		const output = Fn.parseContent([block, links, block, links])

		expect(output.length).toBe(1)
		expect(output[0]?.rows.length).toBe(1)
	})

	it('should return the correct shape', async () => {
		const output = Fn.parseContent([
			block,
			links,
			split,
			block,
			blocks,
			related,
		])

		expect(output).toMatchObject([
			{
				split: null,
				rows: [
					[
						{ _type: 'block', _key: '1', children: [], markDefs: [] },
						{ _type: 'links', _key: '4', layout: 'stack', links: [] },
					],
				],
				id: '1',
			},
			{
				split: {
					_type: 'split',
					_key: '5',
					theme: null,
					variant: 'banner',
					contain: 'default',
				},
				rows: [
					[{ _type: 'block', _key: '1', children: [], markDefs: [] }],
					{
						_type: 'blocks',
						_key: '2',
						theme: null,
						layout: 'block',
						items: [],
					},
					{
						_type: 'related',
						_key: '3',
						theme: null,
						layout: 'block',
						items: [],
					},
				],
				id: '5',
			},
		])
	})

	it('should handle multiple splits', async () => {
		const output = Fn.parseContent([
			block,
			split,
			links,
			split,
			block,
			links,
			block,
			split,
			blocks,
			split,
			related,
		])

		expect(output.length).toBe(5)
		expect(output).toMatchObject([
			{
				split: null,
				rows: [[{ _type: 'block', _key: '1', children: [], markDefs: [] }]],
				id: '1',
			},
			{
				split: {
					_type: 'split',
					_key: '5',
					theme: null,
					variant: 'banner',
					contain: 'default',
				},
				rows: [[{ _type: 'links', _key: '4', layout: 'stack', links: [] }]],
				id: '5',
			},
			{
				split: {
					_type: 'split',
					_key: '5',
					theme: null,
					variant: 'banner',
					contain: 'default',
				},
				rows: [
					[
						{ _type: 'block', _key: '1', children: [], markDefs: [] },
						{ _type: 'links', _key: '4', layout: 'stack', links: [] },
						{ _type: 'block', _key: '1', children: [], markDefs: [] },
					],
				],
				id: '5',
			},
			{
				split: {
					_type: 'split',
					_key: '5',
					theme: null,
					variant: 'banner',
					contain: 'default',
				},
				rows: [
					{
						_type: 'blocks',
						_key: '2',
						theme: null,
						layout: 'block',
						items: [],
					},
				],
				id: '5',
			},
			{
				split: {
					_type: 'split',
					_key: '5',
					theme: null,
					variant: 'banner',
					contain: 'default',
				},
				rows: [
					{
						_type: 'related',
						_key: '3',
						theme: null,
						layout: 'block',
						items: [],
					},
				],
				id: '5',
			},
		])
	})
})
