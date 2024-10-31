import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cx } from '@spon/styled-system/css'
import './style.css'

const heading = localFont({
	src: [
		{
			path: './fonts/Knockout-HTF29-JuniorLiteweight.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './fonts/Knockout-HTF49-Liteweight.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Knockout-HTF50-Welterweight.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-heading',
})

const body = localFont({
	src: [
		{
			path: './fonts/Gotham-Book.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Gotham-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/Gotham-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-body',
})

export const metadata: Metadata = {
	title: 'Sponanity',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className={cx(heading.variable, body.variable, 'antialiased theme')}
		>
			<body>{children}</body>
		</html>
	)
}
