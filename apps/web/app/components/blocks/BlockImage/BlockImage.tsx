import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

type TBlockImageProps = TElementProps & {
	//
}

export function BlockImage(props: TBlockImageProps) {
	return <div data-testid="BlockImage" {...props} />
}
