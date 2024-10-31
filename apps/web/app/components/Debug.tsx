'use client'

export function Debug({
	render = false,
	...props
}: {
	render?: boolean
	[k: string]: unknown
}) {
	console.log('[Debug]', props)
	if (!render) return null

	return <pre>{JSON.stringify(props, null, 2)}</pre>
}
