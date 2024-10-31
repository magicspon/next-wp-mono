import { type VariantProps, cva } from 'class-variance-authority'

const core = {
	variant: {
		home: '',
	},
	component: {
		blocks: '',
		related: '',
	},
} as const

/**
 * @function Root
 * Root  blocks wrapper style
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const root = cva(null, {
	variants: {
		...core,
		layout: {
			banner: 'bg-background text-foreground py-12',
			card: 'px-8 max-w-7xl w-full mx-auto py-8',
			block: '',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

export type Variants = VariantProps<typeof root>

/**
 * @function Root
 * Root  blocks wrapper style
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const wrapper = cva(null, {
	variants: {
		...core,
		layout: {
			banner: 'relative max-w-5xl px-8 mx-auto grid gap-12',
			card: 'grid gap-8 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
			block: 'grid md:grid-cols-2',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

/**
 * @function Item
 * Wraps the media and content components
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const item = cva(null, {
	variants: {
		...core,
		layout: {
			banner: 'relative',
			card: 'grid gap-6 border rounded-xl grid-rows-[auto_1fr]',
			block: 'p-8 md:p-12',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

/**
 * @function Content
 * Content blocks wrapper style, wraps the rich text component
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const content = cva(null, {
	variants: {
		...core,
		layout: {
			banner: 'md:ml-auto max-w-xl',
			card: 'px-6 pb-6',
			block: '',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

/**
 * @function Media
 * Media blocks wrapper style, wraps the media assets
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const media = cva(null, {
	variants: {
		...core,
		layout: {
			banner: 'mb-12',
			card: 'rounded-t-[inherit] overflow-hidden relative',
			block: '',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})

/**
 * @function Asset
 * Block images, videos, whatever
 * Use compoundVariants to generate the className based on the layout/component/variant
 */

export const asset = cva(null, {
	variants: {
		...core,
		layout: {
			banner: '',
			card: 'w-full aspect-[16/14] object-cover',
			block: '',
		},
	},
	compoundVariants: [
		{
			variant: 'home',
			layout: 'banner',
			component: 'blocks',
			className: '',
		},
		{
			variant: 'home',
			layout: 'banner',
			component: 'related',
			className: '',
		},
	],
	defaultVariants: {
		layout: 'card',
	},
})
