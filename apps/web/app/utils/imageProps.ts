import type { MediaItemFragment } from '~/schema/generated.graphql'

export function parseImageProps(props: MediaItemFragment) {
	const {
		size: { width, height },
		src,
		alt,
	} = props.node

	console.log({ src })

	return {
		src,
		alt,
		width,
		height,
	}
}
