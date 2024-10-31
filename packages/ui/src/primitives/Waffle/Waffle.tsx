'use client'

import * as React from 'react'
import { css } from '@spon/styled-system/css'

type TElementProps = React.ComponentProps<'div'>

type TWaffleProps = TElementProps & {
	//
}

export function Waffle(props: TWaffleProps) {
	return (
		<div
			{...props}
			className={css({
				textStyle: 'body/6',
			})}
		>
			Hello peter
		</div>
	)
}
