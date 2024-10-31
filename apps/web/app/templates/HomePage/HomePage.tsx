'use client'

import * as React from 'react'
import type { TAdvancePortable } from '@spon/cms/queries/fragments/content.fragment'
import type { THomeDocument } from '@spon/cms/queries/selection/home.selection'
import { css } from '@spon/styled-system/css'
import { grid, vstack } from '@spon/styled-system/patterns'
import { token } from '@spon/styled-system/tokens'
import { Box } from '@spon/ui/layout/Box'
import { Container } from '@spon/ui/layout/Container'
import { Stack } from '@spon/ui/layout/Stack'
import { Text } from '@spon/ui/type/Text'
import { Palette, PaletteConsumer } from '~/components/Palette'
import { links } from '~/components/portable/links'
import { marks } from '~/components/portable/marks'
import { PortableBlock } from '~/components/portable/render'
import { parseContent } from '~/utils/parseContent'
import { block } from './home.block'
import { types } from './home.types'

export function HomePage({ content, theme }: THomeDocument) {
	const blocks = parseContent(content as TAdvancePortable)

	return (
		<Palette
			theme={theme}
			data-testid="HomePage"
			style={
				{
					'--test': 1.25,
					'--card-size': '25rem',
					'--scaling': '2',
				} as React.CSSProperties
			}
		>
			<Container
				maxW="7xl"
				marginX="auto"
				className={grid({
					gap: '8',
					gridTemplateColumns:
						'repeat(auto-fit, minmax(var(--card-size, token(grid.card)), 1fr))',
				})}
			>
				<Box px="8">hello</Box>
				<Box px="8">b</Box>
				<Box px="8">c</Box>
				<Box px="8">d</Box>
				<Box px="8">e</Box>
			</Container>
			<PaletteConsumer asChild>
				<Stack alignItems="start" gap="4" scaling="2">
					<Text
						family="heading"
						size={8}
						mb="var(--author-mb, token(spacing.4))"
						color="var(--author-color, token(colors.accent))"
					>
						Oh hello
					</Text>
					<Text family="body" size={6}>
						Hello peter
					</Text>
				</Stack>
			</PaletteConsumer>
			{/* <div className={vstack({ gap: 5 })}>
				{blocks.map(({ rows, id, split }) => (
					<PortableBlock
						key={id}
						id={id}
						rows={rows}
						split={split}
						types={types}
						links={links}
						marks={marks}
						block={block}
					/>
				))}
			</div> */}
		</Palette>
	)
}
