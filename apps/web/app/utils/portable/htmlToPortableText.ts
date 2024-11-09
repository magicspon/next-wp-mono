/* htmlToPortableText */
import type { PortableTextBlock, TypedObject } from '@portabletext/types'
import { htmlToBlocks } from '@sanity/block-tools'
import type { ArraySchemaType } from '@sanity/types'
import { isArray, isObject } from 'es-toolkit/compat'
import { JSDOM } from 'jsdom'
import { ProjectError } from '@spon/utils/ProjectError'
import { defaultSchema } from './schema'
import type { PortableSchema } from './schema.type'

type AnyObject = Record<string, any>

type IsArray<T> = T extends any[] ? true : false

// Helper type to check if a type is an object (excluding arrays)
type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false

/**
 * Recursively replaces the type of a specific key throughout an object type structure
 * @template T - The source type to transform
 * @template K - The key to match against (must be string)
 * @template R - The replacement type for matched keys
 */
type DeepReplaceKeyType<T, K extends string, R> = T extends (infer U)[]
	? DeepReplaceKeyType<U, K, R>[] // Handle arrays
	: T extends object
		? {
				[P in keyof T]: P extends K
					? R // Replace type if key matches
					: IsObject<T[P]> extends true
						? DeepReplaceKeyType<T[P], K, R> // Recurse into nested objects
						: IsArray<T[P]> extends true
							? DeepReplaceKeyType<T[P], K, R> // Recurse into arrays
							: T[P] // Keep original type for non-matching primitives
			}
		: T // Base case: return primitive types as-is

export type PortableValue = (TypedObject | PortableTextBlock)[]

// Example usage:
export type WithPortableText<A> = DeepReplaceKeyType<A, 'body', PortableValue>

type PortableHelperInput = string | PortableValue

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
export function transformMatchingKey<T extends AnyObject>(
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

				return transformMatchingKey(s, targetKey, newValue)
			}) as T[keyof T]
		} else if (isObject(value)) {
			acc[typedKey] = transformMatchingKey(obj[key], targetKey, newValue)
		} else {
			// If it doesn't match and it's not an object, keep it as is
			acc[typedKey] = value
		}
		return acc
		// eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
	}, {} as T)
}

export function parse<T extends AnyObject>(props: T) {
	return transformMatchingKey<T>(props, 'body', (v) =>
		htmlToPortableText({ raw: v }),
	)
}
