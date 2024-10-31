import { VisualEditing } from 'next-sanity'

export function DraftMode() {
	return (
		<>
			<a
				className="fixed bottom-1 right-1 bg-blue-500 p-2 text-sm text-white"
				href="/api/draft/disable"
			>
				Disable preview mode
			</a>
			<VisualEditing />
		</>
	)
}
