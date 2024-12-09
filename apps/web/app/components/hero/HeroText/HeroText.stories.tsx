import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
// import type { THeroTextProps } from '.'
import { hero, HeroText } from '.'
import { stub } from './stub'
import { Text } from '@spon/ui/type/Text'
import { Button } from '@spon/ui/primitives/Button'
import { css } from '@spon/styled-system/css'

const meta = {
	title: 'component/HeroText',
	component: HeroText,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {},
} satisfies Meta<typeof HeroText>

export default meta
type Story = StoryObj<typeof meta>

export const Banner: Story = {
	args: stub,

	render: () => {
		const classes = hero({ variant: 'banner' })

		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<Text
						className={css({ textStyle: 'display/1', scaling: { md: '2' } })}
					>
						studio you
					</Text>
					<Text className={css({ textStyle: 'body/6', scaling: { md: '2' } })}>
						#PressPlayHaveFun
					</Text>
					<div>
						<Button variant="default">Watch the video</Button>
					</div>
				</div>
			</div>
		)
	},
}

export const Stack: Story = {
	args: stub,

	render: () => {
		const classes = hero({ variant: 'stack' })

		return (
			<div className={classes.root}>
				<div className={classes.content}>
					<Text
						className={css({ textStyle: 'display/1', scaling: { md: '2' } })}
					>
						studio you
					</Text>
					<Text className={css({ textStyle: 'body/6', scaling: { md: '2' } })}>
						#PressPlayHaveFun
					</Text>
					<div>
						<Button variant="default">Watch the video</Button>
					</div>
				</div>
			</div>
		)
	},
}

export const WithRealData: Story = {
	args: stub,
}
