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
