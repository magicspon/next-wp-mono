import type {
	PortableTextBlockComponent,
	PortableTextMarkComponent,
} from '@portabletext/react'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlockStyle } from '@portabletext/types'
import Link from 'next/link'
import * as React from 'react'
import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import type { BlocksTextStylesFragment } from '~/schema/generated.graphql'
import type { PortableValue } from '~/utils/portable/htmlToPortableText'
import { findFontSize, getTextStyles } from '~/utils/style/typography'
import type { RemoveTypename } from '~/utils/ts-helpers'

const defaultBlocks = (
	style?: RemoveTypename<BlocksTextStylesFragment>,
): Record<PortableTextBlockStyle, PortableTextBlockComponent | undefined> => {
	const el = getTextStyles(style) ?? {}
	return {
		h1: ({ children }) => (
			<h1 className={css({ textStyle: el.h1 ?? 'display/2' })}>{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className={css({ textStyle: el.h2 ?? 'display/3' })}>{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className={css({ textStyle: el.h3 ?? 'display/4' })}>{children}</h3>
		),
		h4: ({ children }) => (
			<h4 className={css({ textStyle: el.h4 ?? 'display/5' })}>{children}</h4>
		),
		h5: ({ children }) => (
			<h5 className={css({ textStyle: el.h5 ?? 'display/6' })}>{children}</h5>
		),
		h6: ({ children }) => (
			<h6 className={css({ textStyle: el.h6 ?? 'display/7' })}>{children}</h6>
		),
		normal: ({ children }) => (
			<p className={css({ textStyle: el.normal ?? 'body/3' })}>{children}</p>
		),
		blockquote: ({ children }) => (
			<blockquote className={css({ textStyle: el.blockquote ?? 'body/2' })}>
				{children}
			</blockquote>
		),
	}
}

export type PortableProps = {
	body: PortableValue
	components?: {
		block?: Record<PortableTextBlockStyle, PortableTextBlockComponent>
		marks?: Record<string, PortableTextMarkComponent>
	}
	style?: RemoveTypename<BlocksTextStylesFragment>
}

export function Portable({ body, components = {}, style }: PortableProps) {
	const { block, marks } = components
	return (
		<PortableText
			value={body}
			components={{
				block: {
					...defaultBlocks(style),
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
					...marks,
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
					<li
						className={css({
							textStyle: findFontSize('normal', style),
						})}
					>
						{children}
					</li>
				),
			}}
		/>
	)
}
