import clsx from 'clsx'
import * as React from 'react'

export function Truncate({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return <span className={clsx('block truncate', className)} {...props} />
}
