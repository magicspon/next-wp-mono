import type { PortableTextBlockComponent } from '@portabletext/react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlockStyle } from '@portabletext/types'
import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { Text } from '@spon/ui/type/Text'
import type { PortableValue } from '~/utils/portable/htmlToPortableText'

const defaultBlocks: Record<
	PortableTextBlockStyle,
	PortableTextBlockComponent | undefined
> = {
	h1: ({ children }) => (
		<Text
			asChild
			size={9}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h1)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.8))*var(--scaling))',
			})}
		>
			<h1>{children}</h1>
		</Text>
	),
	h2: ({ children }) => (
		<Text
			asChild
			size={7}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h2)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.6))*var(--scaling))',
			})}
		>
			<h2>{children}</h2>
		</Text>
	),
	h3: ({ children }) => (
		<Text
			asChild
			size={5}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h3)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.5))*var(--scaling))',
			})}
		>
			<h3>{children}</h3>
		</Text>
	),
	h4: ({ children }) => (
		<Text
			asChild
			size={4}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h4)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.4))*var(--scaling))',
			})}
		>
			<h4>{children}</h4>
		</Text>
	),
	h5: ({ children }) => (
		<Text
			asChild
			size={4}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h5)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.3))*var(--scaling))',
			})}
		>
			<h5>{children}</h5>
		</Text>
	),
	h6: ({ children }) => (
		<Text
			asChild
			size={3}
			family="heading"
			style={{
				'--font-size': 'var(--font-size-h6)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.2))*var(--scaling))',
			})}
		>
			<h6>{children}</h6>
		</Text>
	),
	normal: ({ children }) => (
		<Text
			size={3}
			family="body"
			style={{
				'--font-size': 'var(--font-size-normal)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.4))*var(--scaling))',
			})}
		>
			{children}
		</Text>
	),

	blockquote: ({ children }) => (
		<Text
			asChild
			size={3}
			family="body"
			style={{
				'--font-size': 'var(--font-size-normal)',
			}}
			className={css({
				fontSize: 'calc(var(--font-size, token(fontSizes.4))*var(--scaling))',
				fontStyle: 'italic',
			})}
		>
			<blockquote>{children}</blockquote>
		</Text>
	),
}

export type PortableProps = {
	body: PortableValue
	components?: {
		block?: Record<PortableTextBlockStyle, PortableTextBlockComponent>
	}
}

export function Portable({ body, components = {} }: PortableProps) {
	const { block } = components
	return (
		<PortableText
			value={body}
			components={{
				block: {
					...defaultBlocks,
					...block,
				},
				marks: {
					link: ({ text, value }) => {
						return (
							<Link
								className={css({
									textDecoration: 'underline',
									color: 'var(--color-accent, token(colors.accent))',
								})}
								href={value.href}
							>
								{text}
							</Link>
						)
					},
				},
				list: {
					bullet: ({ children }) => (
						<Stack asChild alignItems="start">
							<ul>{children}</ul>
						</Stack>
					),
					number: ({ children }) => (
						<Stack asChild alignItems="start">
							<ol>{children}</ol>
						</Stack>
					),
				},
				listItem: ({ children }) => (
					<Text
						size={3}
						family="body"
						style={{
							'--font-size': 'var(--font-size-normal)',
						}}
						className={css({
							fontSize:
								'calc(var(--font-size, token(fontSizes.4))*var(--scaling))',
						})}
						asChild
					>
						<li>{children}</li>
					</Text>
				),
			}}
		/>
	)
}
