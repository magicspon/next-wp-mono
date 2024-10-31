import type { ImageProps } from 'next/image'
import { urlBuilder } from '@spon/cms/lib/image'
import type { TImageSelection } from '@spon/cms/queries/fragments/image.fragment'

export const createBuilder = urlBuilder

export const transformImage = (
	props: TImageSelection | null | undefined,
	target: { width: number; height: number },
): ImageProps | null => {
	if (!props) return null

	const blurDataURL = props.asset.lqip
	const src = urlBuilder(props)

	return {
		src: src.size(target.width, target.height).url(),
		width: target.width,
		height: target.height,
		alt: props.alt ?? '',
		blurDataURL,
		placeholder: 'blur',
	}
}

export function imageProps(props: TImageSelection, fill?: boolean): ImageProps {
	const width = props.asset.width
	const height = props.asset.height
	const alt = props.alt ?? ''
	const blurDataURL = props.asset.lqip

	if (!props.hotspot || !props.crop) {
		if (fill) {
			return {
				src: props.asset.url,
				alt,
				blurDataURL,
				placeholder: 'blur',
				fill: true,
			}
		}

		return {
			src: props.asset.url,
			width,
			height,
			alt,
			blurDataURL,
			placeholder: 'blur',
		}
	}

	const cropWidth = Math.ceil(width * props.hotspot.width)
	const cropHeight = Math.ceil(height * props.hotspot.height)

	const src = urlBuilder(props).rect(
		Math.ceil(props.crop.left * width),
		Math.ceil(props.crop.top * height),
		cropWidth,
		cropHeight,
	)

	if (fill) {
		return {
			src: src.url(),
			alt,
			blurDataURL,
			placeholder: 'blur',
			fill: true,
		}
	}

	return {
		src: src.url(),
		width: cropWidth,
		height: cropHeight,
		alt,
		blurDataURL,
		placeholder: 'blur',
	}
}
