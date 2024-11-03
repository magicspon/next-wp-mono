import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { cx } from '@spon/styled-system/css'
import { flex } from '@spon/styled-system/patterns'
import { Header } from '~/components/Header'
import { sdk } from '~/lib/gqlClient'
import { Provider } from './provider'
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

async function loader() {
	const resp = await sdk.GlobalSettings()

	if (!resp) notFound()

	return {
		seo: resp.seo,
		mainMenu: resp.menu.menuItems.nodes,
	}
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { mainMenu } = await loader()

	return (
		<html
			lang="en"
			className={cx(heading.variable, body.variable, 'antialiased theme')}
		>
			<body>
				<Provider>
					<Header menu={mainMenu} />
					<main className={flex({ flexDirection: 'column', flex: 1 })}>
						{children}
					</main>
					{/* <Footer menu={page.footerMenu} /> */}
				</Provider>
			</body>
		</html>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	const { seo } = await loader()

	return {
		title: {
			template: `%s | ${seo.schema.siteName}`,
			default: seo.schema.siteName,
		},
		description: seo.meta.homepage.description,
		openGraph: {
			title: seo.openGraph.frontPage.title,
			description: seo.openGraph.frontPage.description,
			images: [seo.openGraph.defaultImage?.sourceUrl],
		},
	}
}
