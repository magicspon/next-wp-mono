import type { THeroTextProps } from './HeroText'

// `[] values changed to [] to keep ts happy`
export const stub: THeroTextProps = {
	textPanel: {
		style: {
			section: {
				align: [],
				justify: [],
				box: [],
				theme: [],
				width: [],
			},
			textAlign: [],
			scale: [{ attribute: ['md-scaling'], scaling: ['2'] }],
		},
		blocks: [
			{
				__typename: 'ComponentsTextPanelBlocksTextLayout',
				tag: ['p'],
				text: 'studio you',
				textStyles: {
					typography: {
						textAlign: [],
						textSizes: [{ fontSize: ['display/1'], style: ['font-size'] }],
						theme: [],
						scale: [],
					},
				},
			},
			{
				__typename: 'ComponentsTextPanelBlocksTextLayout',
				tag: ['p'],
				text: '#PressPlayHaveFun',
				textStyles: {
					typography: {
						textAlign: [],
						textSizes: [{ fontSize: ['body/6'], style: ['font-size'] }],
						theme: [],
						scale: [],
					},
				},
			},
			{
				__typename: 'ComponentsTextPanelBlocksButtonsLayout',
				buttons: [
					{
						button: {
							variant: ['default'],
							link: {
								title: 'Watch the video',
								url: 'https://localhost:3000/parent/child-page/',
								target: '',
							},
						},
					},
				],
			},
		],
	},
	style: {
		heroTextVariant: ['stack'],
		section: {
			align: [],
			justify: [],
			box: [],
			theme: [],
			width: [],
		},
	},
}
