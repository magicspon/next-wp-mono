import type { ImageProps } from 'next/image'
import type { MediaItemFragment } from '~/schema/generated.graphql'

export function parseImageProps(
	props: MediaItemFragment,
	fill = false,
): ImageProps {
	const {
		size: { width, height },
		src,
		alt,
	} = props.node

	if (fill) {
		return {
			src,
			alt,
		}
	}

	return {
		src,
		alt,
		width,
		height,
	}
}
