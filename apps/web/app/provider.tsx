'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, MotionConfig } from 'framer-motion'
import type * as React from 'react'
import { getQueryClient } from '~/utils/getQueryClient'

const loadFeatures = () =>
	import('~/utils/motionFeatures').then((res) => res.domAnimation)

export function Provider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient()

	return (
		<MotionConfig reducedMotion="user">
			<LazyMotion features={loadFeatures}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</LazyMotion>
		</MotionConfig>
	)
}
