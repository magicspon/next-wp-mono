import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Checkbox } from '.'
import { Text } from '../../type/Text'
import { Label } from '../Label'

const meta = {
	title: 'form/Checkbox',
	component: Checkbox,
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: (props) => (
		<Label className="flex items-center gap-3">
			<Checkbox {...props} />
			<Text>Hello</Text>
		</Label>
	),
}
