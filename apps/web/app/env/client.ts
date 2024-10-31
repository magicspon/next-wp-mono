import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	client: {
		NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	},
})
