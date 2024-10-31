import { cva } from 'class-variance-authority'
import * as React from 'react'
import { Text } from '@spon/ui/type/Text'
import type { TBlockStyle } from '~/types/helpers'

export const variants = cva(null, {
	variants: {
		intent: {
			subHeading: 'text-sm uppercase sibling:mb-2 ',
			heading: 'text-2xl sibling:mb-6',
			lead: 'text-lg sibling:mb-6',
			normal: 'text-base sibling:mb-5',
			small: 'text-xs sibling:mb-4',
		},
		// this is only here so we can use compound variants
		family: { body: '', title: '' },
	},
	compoundVariants: [
		{
			family: 'title',
			intent: 'subHeading',
			className: 'text-accent uppercase',
		},
	],
	defaultVariants: {
		intent: 'normal',
	},
})

export const block: TBlockStyle = {
	heading: ({ children }) => (
		<Text asChild weight="bold" className={variants({ intent: 'heading' })}>
			<h2>{children}</h2>
		</Text>
	),
	subHeading: ({ children }) => (
		<Text className={variants({ intent: 'subHeading' })} weight="medium">
			{children}
		</Text>
	),
	lead: ({ children }) => (
		<Text className={variants({ intent: 'lead' })}>{children}</Text>
	),
	normal: ({ children }) => (
		<Text className={variants({ intent: 'normal' })}>{children}</Text>
	),
	small: ({ children }) => (
		<Text className={variants({ intent: 'small' })}>{children}</Text>
	),

	headingTitle: ({ children }) => (
		<Text
			asChild
			weight="bold"
			style={{
				'--accent': '100 56% 30%',
			}}
			className={variants({ intent: 'heading', family: 'title' })}
		>
			<h2>{children}</h2>
		</Text>
	),
	subHeadingTitle: ({ children }) => (
		<Text
			className={variants({ intent: 'subHeading', family: 'title' })}
			weight="medium"
		>
			{children}
		</Text>
	),
	leadTitle: ({ children }) => (
		<Text className={variants({ intent: 'lead', family: 'title' })}>
			{children}
		</Text>
	),
	normalTitle: ({ children }) => (
		<Text className={variants({ intent: 'normal', family: 'title' })}>
			{children}
		</Text>
	),
	smallTitle: ({ children }) => (
		<Text className={variants({ intent: 'small', family: 'title' })}>
			{children}
		</Text>
	),
}
