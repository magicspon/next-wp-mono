import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

type TBlockImageProps = TElementProps & {
	className?: string
}

export function BlockImage({ className, ...props }: TBlockImageProps) {
	return <div className={className} data-testid="BlockImage" {...props} />
}
