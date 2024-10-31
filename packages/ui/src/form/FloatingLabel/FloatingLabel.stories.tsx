import type { Meta } from '@storybook/react'
import * as React from 'react'
import { FloatingLabel } from '.'
import { Input } from '../Input'
import { Textarea } from '../Textarea'

export default {
	component: FloatingLabel,
	title: 'form/FloatingLabel',
} as Meta<typeof FloatingLabel>

type Args = React.ComponentProps<typeof FloatingLabel>

export const Primary = {
	render: (args: Args) => (
		<div className="pt-12">
			<FloatingLabel {...args}>
				<Input floating name="name" id="name" placeholder="Your name" />
			</FloatingLabel>
		</div>
	),

	args: {
		text: 'Your name',
	} satisfies Args,
}

export const FloatingTextArea = {
	render: (args: Args) => (
		<div className="pt-12">
			<FloatingLabel {...args}>
				<Textarea floating name="name" id="name" placeholder="Message" />
			</FloatingLabel>
		</div>
	),

	args: {
		text: 'Message',
		element: 'textarea',
	} satisfies Args,
}
