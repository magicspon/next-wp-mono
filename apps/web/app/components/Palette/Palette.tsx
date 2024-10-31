'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import type { TTheme } from '@spon/cms/queries/fragments/theme.fragment'
import { getTokenKey } from '@spon/ui/utils/getTokenKey'

type TElementProps = React.ComponentProps<'div'>

type TSafeTheme = TTheme | null | undefined
type TWithOutTitle = Omit<NonNullable<TTheme>, 'title'>
type TContextTheme = TWithOutTitle | undefined | null

export type TPaletteProps = TElementProps & {
	asChild?: boolean
	theme: TSafeTheme
}

type TPaletteContext = {
	theme?: TContextTheme
	setTheme: React.Dispatch<React.SetStateAction<TContextTheme>>
}

type ThemeKeys = Exclude<keyof NonNullable<TTheme>, 'title'> // "background" | "foreground" | "accent"

const ThemeContext = React.createContext<TPaletteContext>(null!)

function parseTheme(theme?: TContextTheme) {
	if (!theme) {
		return {}
	}

	const sx = Object.entries(theme).reduce<React.CSSProperties>((acc, item) => {
		const [key, { hsl }] = item
		const prop = key as ThemeKeys
		const token = getTokenKey(`colors.${prop}`)

		acc[token] = `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`
		return acc
	}, {})

	return sx
}

export function usePaletteContext() {
	return React.useContext(ThemeContext)
}

export function usePalette() {
	const { theme } = usePaletteContext()

	return parseTheme(theme)
}

export const Palette = React.forwardRef<React.ElementRef<'div'>, TPaletteProps>(
	function Palette({ asChild, theme, style, ...props }, ref) {
		const Comp = asChild ? Slot : 'div'
		const { title, ...themeProps } = theme ?? ({} as NonNullable<TTheme>)
		const [t, setTheme] = React.useState<TContextTheme>(themeProps)
		const sx = Object.assign(style ?? {}, parseTheme(t))

		return (
			<ThemeContext.Provider value={{ theme: t, setTheme }}>
				<Comp data-theme={title} ref={ref} style={sx} {...props} />
			</ThemeContext.Provider>
		)
	},
)

export const PaletteConsumer = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'> & { asChild: boolean }
>(function PaletteConsumer({ asChild, style, ...props }, ref) {
	const Comp = asChild ? Slot : 'div'

	const sx = usePalette()

	return <Comp style={{ ...sx, ...style }} {...props} ref={ref} />
})

function Waffles() {
	const token = getTokenKey('colors.accent')

	return <div style={{ [token]: 'blue' }} />
}
