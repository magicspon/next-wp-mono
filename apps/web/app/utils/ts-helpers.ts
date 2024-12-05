import type { PortableTextBlock, TypedObject } from '@portabletext/types'

export type RemoveTypename<T> = T extends any[]
	? RemoveTypename<T[number]>[]
	: T extends object
		? {
				[K in keyof T as K extends `__typename` ? never : K]: RemoveTypename<
					T[K]
				>
			}
		: T

export type TComponentAsProp<T extends React.ComponentType<any>> =
	React.ComponentType<React.ComponentProps<T>>

export type AnyObject = Record<string, any>

type IsArray<T> = T extends any[] ? true : false

// Helper type to check if a type is an object (excluding arrays)
type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false

/**
 * Recursively replaces the type of a specific key throughout an object type structure
 * @template T - The source type to transform
 * @template K - The key to match against (must be string)
 * @template R - The replacement type for matched keys
 */
export type DeepReplaceKeyType<T, K extends string, R> = T extends (infer U)[]
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
export type WithPT<T> = DeepReplaceKeyType<T, 'body', PortableValue>

export type PortableHelperInput = string | PortableValue
