import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import * as Carousel from '.'

const meta = {
	title: 'primitives/Carousel',
	component: Carousel.Root,
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
} satisfies Meta<typeof Carousel.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		options: {},
	},
	render: () => (
		<Carousel.Root
			options={{
				active: true,
				axis: 'x',
				align: 'center',
				slidesToScroll: 1,
			}}
		>
			<Carousel.Prev>Prev</Carousel.Prev>
			<Carousel.Next>Next</Carousel.Next>
			<Carousel.Content>
				<Carousel.Viewport>
					<Carousel.Item value={0} className="w-full flex-shrink-0">
						A
					</Carousel.Item>
					<Carousel.Item value={1} className="w-full flex-shrink-0">
						B
					</Carousel.Item>
					<Carousel.Item value={2} className="w-full flex-shrink-0">
						C
					</Carousel.Item>
					<Carousel.Item value={3} className="w-full flex-shrink-0">
						D
					</Carousel.Item>
				</Carousel.Viewport>
			</Carousel.Content>
			<Carousel.Dots>
				<Carousel.Dot value={0}>Dot</Carousel.Dot>
				<Carousel.Dot value={1}>Dot</Carousel.Dot>
				<Carousel.Dot value={2}>Dot</Carousel.Dot>
				<Carousel.Dot value={3}>Dot</Carousel.Dot>
			</Carousel.Dots>
		</Carousel.Root>
	),
}
