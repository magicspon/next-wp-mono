import clsx from 'clsx'
import * as React from 'react'

export function VisuallyHidden({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return <span className={clsx(className, 'sr-only')} {...props} />
}
