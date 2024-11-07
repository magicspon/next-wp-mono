import * as React from 'react'
import { Text } from '@spon/ui/type/Text'
import type { BlocksTextFragment } from '~/schema/generated.graphql'

export function BlockText({
	text,
	fontFamily,
	fontSize,
	colours,
}: BlocksTextFragment) {
	console.log({ fontFamily, fontSize, colours })
	return <Text>{text}</Text>
}
