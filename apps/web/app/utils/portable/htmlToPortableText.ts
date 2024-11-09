/* htmlToPortableText */
import type { PortableTextBlock, TypedObject } from '@portabletext/types'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import type { ArraySchemaType } from '@sanity/types'
import { isArray, isObject } from 'es-toolkit/compat'
import { JSDOM } from 'jsdom'
import { ProjectError } from '@spon/utils/ProjectError'
import type { PortableSchema } from './schema'

type THtmlToPortableText = {
	raw: string
}

const defaultSchema = Schema.compile({
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

export function htmlToPortableText({ raw }: THtmlToPortableText) {
	const html = defaultSchema.get('contents') as PortableSchema
	const schema = html.fields.find((field) => field.name === 'body')

	if (!schema) {
		throw new ProjectError({ code: 'INPUT_ERROR', message: 'Invalid' })
	}

	const schemaType = schema.type as ArraySchemaType

	const content = htmlToBlocks(raw, schemaType, {
		parseHtml: (html) => new JSDOM(html).window.document,
	})

	return content
}

/**
 * This is function doesn't do anything, it just gives the correct type
 * @param arg string
 * @returns
 */
type PortableHelperInput = string | (TypedObject | PortableTextBlock)[]
export const portable = (arg: PortableHelperInput) =>
	arg as unknown as (TypedObject | PortableTextBlock)[]

type AnyObject = Record<string, any>

export function transformWysiwygToPortable<T extends AnyObject>(
	obj: T,
	targetKey: string,
	newValue: (d: any) => any,
): T {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		const typedKey = key as keyof T
		// If the key matches the target, set it to the new value
		if (typedKey === targetKey) {
			acc[typedKey] = newValue(value)
		} else if (isArray(value)) {
			acc[typedKey] = value.map((s) => {
				if (typeof s === 'string') return s

				return transformWysiwygToPortable(s, targetKey, newValue)
			}) as T[keyof T]
		} else if (isObject(value)) {
			acc[typedKey] = transformWysiwygToPortable(obj[key], targetKey, newValue)
		} else {
			// If it doesn't match and it's not an object, keep it as is
			acc[typedKey] = value
		}
		return acc
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
	}, {} as T)
}

export type WithPortableText<A, name extends keyof A> = Omit<A, name> &
	Record<name, (TypedObject | PortableTextBlock)[]>

export function parse<T extends AnyObject>(props: T) {
	return transformWysiwygToPortable<T>(props, 'body', (v) =>
		htmlToPortableText({ raw: v }),
	)
}
