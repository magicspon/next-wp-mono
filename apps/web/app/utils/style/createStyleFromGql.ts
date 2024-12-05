import type {
	ColorToken,
	ScalingToken,
	SizeToken,
	SpacingToken,
} from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'

type StyleProps = {
	value: string[]
	attribute: string[]
}[]

export const namespace = (attribute: string, namespace?: string) =>
	namespace ? `${namespace}-${attribute}` : attribute

export function createStyleFromGraphql(input?: StyleProps, prefix = '') {
	if (!input) return null

	return input?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			value: [value],
		} = s

		if (!value || !attribute) return acc

		acc[`--${namespace(attribute, prefix)}`] = value

		return acc
	}, {})
}

type StyleSpacingProps = {
	spacing: string[]
	attribute: string[]
}[]

export function createSpacing(box: StyleSpacingProps, prefix?: string) {
	return box?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			spacing: [spacing],
		} = s

		if (!attribute || !spacing) return acc

		acc[`--${namespace(attribute, prefix)}`] = token(
			`spacing.${spacing as SpacingToken}`,
		)

		return acc
	}, {})
}

type StyleColorsProps = {
	colours: string[]
	attribute: string[]
}[]

export function createColors(theme: StyleColorsProps, prefix?: string) {
	return theme?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			colours: [colours],
		} = s

		if (!attribute || !colours) return acc

		acc[`--${namespace(attribute, prefix)}`] = token(
			`colors.${colours as ColorToken}`,
		)

		return acc
	}, {})
}

type StyleScaleProps = {
	scaling: string[]
	attribute: string[]
}[]
export function createScale(theme: StyleScaleProps, prefix?: string) {
	return theme?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			scaling: [scaling],
		} = s

		if (!attribute || !scaling) return acc

		console.log({ v: token(`scaling.${scaling as ScalingToken}`) })

		acc[`--${namespace(attribute, prefix)}`] = token(
			`scaling.${scaling as ScalingToken}`,
		)

		console.log({ acc })

		return acc
	}, {})
}

export function createWidths(widths: StyleProps, prefix?: string) {
	return widths?.reduce<Record<string, string>>((acc, s) => {
		const {
			attribute: [attribute],
			value: [value],
		} = s

		if (!attribute || !value) return acc

		acc[`--${namespace(attribute, prefix)}`] = token(
			`sizes.${value as SizeToken}`,
		)

		return acc
	}, {})
}
