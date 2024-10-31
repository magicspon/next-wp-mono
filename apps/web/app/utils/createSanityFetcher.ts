import { draftMode } from 'next/headers'
import { runDraftQuery, runQuery } from '@spon/cms/lib/runner'
import { env } from '~/env/server'

export const token = env.SANITY_STUDIO_READ_TOKEN

export function createSanityFetcher() {
	const isDraftMode = draftMode().isEnabled
	const runner = isDraftMode ? runDraftQuery : runQuery

	return runner as typeof runQuery
}
