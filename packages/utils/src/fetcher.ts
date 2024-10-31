import { ProjectError } from './ProjectError'

export async function fetcher<T = unknown>(
	url: string,
	input?: string | FormData | Blob,
): Promise<T> {
	const shouldGet = !input
	const response = shouldGet
		? await fetch(url, {
				method: 'GET',
			})
		: await fetch(url, {
				method: 'POST',
				body: input,
			})

	if (!response.ok) {
		const info = (await response.json()) as Error
		throw new ProjectError({ code: 'UNKNOWN_ERROR', message: info.message })
	}

	return response.json()
}
