import type { Preview } from '@storybook/react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import * as React from 'react'
import '../src/style/global.css'

const loadFeatures = () =>
	import('../src/motion/features').then((res) => res.domAnimation)
// replace with the name of your tailwind css file

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => {
			return (
				<MotionConfig reducedMotion="user">
					<LazyMotion features={loadFeatures}>
						<Story />
					</LazyMotion>
				</MotionConfig>
			)
		},
	],
}

export default preview
