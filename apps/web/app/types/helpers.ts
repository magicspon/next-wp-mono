import type {
	PortableTextBlockComponent,
	PortableTextTypeComponent,
} from 'next-sanity'

export type TPortableBlock<T extends { _type: any }> = Record<
	T['_type'],
	PortableTextTypeComponent<T>
>

export type TBlockStyle = Record<string, PortableTextBlockComponent>
