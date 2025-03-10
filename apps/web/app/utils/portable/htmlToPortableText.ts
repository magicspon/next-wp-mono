// this file should only be called on the server
// it includes JSDOM which is a rather large library
// the server-only package will throw an error if this
// is imported into any client code
import { htmlToBlocks } from '@sanity/block-tools'
import type { ArraySchemaType } from '@sanity/types'
import { isArray, isObject } from 'es-toolkit/compat'
import { JSDOM } from 'jsdom'
import { marked } from 'marked'
// import 'server-only'
import { ProjectError } from '@spon/utils/ProjectError'
import type {
	AnyObject,
	PortableHelperInput,
	PortableValue,
	WithPT,
} from '../ts-helpers'
import { defaultSchema } from './schema'
import type { PortableSchema } from './schema.type'

type THtmlToPortableText = {
	raw: string
}

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
export const portable = (arg: PortableHelperInput) =>
	arg as unknown as PortableValue

// the types are a bit crap here
// lots of casting, it kinda does the job
export function transformMatchingKeys<T extends AnyObject>(
	obj: T,
	keys: string[],
	transform: (key: string, value: string) => any,
) {
	return Object.entries(obj).reduce((acc, [key, value]) => {
		const typedKey = key as keyof T
		// If the key matches the target, set it to the new value
		if (keys.includes(key) && typeof value === 'string') {
			acc[typedKey] = transform(key, value)
		} else if (isArray(value)) {
			acc[typedKey] = value.map((s) => {
				if (typeof s === 'string') return s
				return transformMatchingKeys(s, keys, transform)
			}) as T[keyof T]
		} else if (isObject(value)) {
			acc[typedKey] = transformMatchingKeys(obj[key], keys, transform)
		} else {
			// If it doesn't match and it's not an object, keep it as is
			acc[typedKey] = value
		}
		return acc
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
	}, {} as T) as WithPT<T>
}

export function parse<T extends AnyObject>(props: T) {
	return transformMatchingKeys<T>(props, ['body', 'markdown'], (key, v) => {
		if (key === 'body') {
			return htmlToPortableText({ raw: v })
		}
		if (key === 'markdown') {
			return marked.parseInline(v)
		}
	})
}
