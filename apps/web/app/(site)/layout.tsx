import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { settingsQuery } from '@spon/cms/queries/pages/settings.query'
import { css } from '@spon/styled-system/css'
import { flex } from '@spon/styled-system/patterns'
import { getFirstOrNull } from '@spon/utils/getFirstOrNull'
import { DraftMode } from '~/(sanity)/components/DraftMode'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Palette } from '~/components/Palette'
import { createSanityFetcher } from '~/utils/createSanityFetcher'
import { Provider } from './provider'

async function loader() {
	const runner = createSanityFetcher()
	const data = await runner(settingsQuery, {}, { next: { tags: ['settings'] } })
	const page = getFirstOrNull(data.page)

	if (!page) notFound()

	return {
		page,
	}
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { page } = await loader()

	return (
		<Provider>
			<Palette
				theme={page.theme}
				className={flex({
					flexDirection: 'column',
					minH: 'screen',
				})}
			>
				<Header menu={page.mainMenu} />
				<main className={flex({ flexDirection: 'column', flex: 1 })}>
					{children}
				</main>
				<Footer menu={page.footerMenu} />
			</Palette>
			{draftMode().isEnabled && <DraftMode />}
		</Provider>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	const { page } = await loader()

	return {
		title: {
			template: `%s | ${page.title}`,
			default: page.title,
		},
		description: page.description,
	}
}
