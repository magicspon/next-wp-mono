import type { MotionProps } from 'framer-motion'

export const presenceProps = {
	animate: 'enter',
	initial: 'exit',
	exit: 'exit',
}

export const fadeProps: MotionProps['variants'] = {
	enter: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
}

export const fadeLeftProps: MotionProps['variants'] = {
	enter: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: '25%',
	},
}

export const fadeRightProps: MotionProps['variants'] = {
	enter: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: '-25%',
	},
}
