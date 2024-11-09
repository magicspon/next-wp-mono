import { Schema } from '@sanity/schema'

export const defaultSchema = Schema.compile({
	name: 'html',
	types: [
		{
			type: 'object',
			name: 'contents',
			fields: [
				{
					title: 'Body',
					name: 'body',
					type: 'array',
					of: [{ type: 'block' }],
				},

				{
					name: 'blockquote',
					type: 'object',
					title: 'Blockquote',
					fields: [
						{
							title: 'Text',
							name: 'value',
							type: 'text',
						},
					],
				},
			],
		},
	],
})
