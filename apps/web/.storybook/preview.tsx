import type { Preview } from '@storybook/react'
import * as React from 'react'
import '../app/style.css'
import { Provider } from '~/provider'
import { cx } from '@spon/styled-system/css'

import { heading, body } from '../app/layout'
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
				<Provider>
					<div
						className={cx(
							heading.variable,
							body.variable,
							'theme w-full antialiased',
						)}
					>
						<Story />
					</div>
				</Provider>
			)
		},
	],
}

export default preview
