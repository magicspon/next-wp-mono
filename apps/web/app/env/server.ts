import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		SANITY_STUDIO_PROJECT_ID: z.string().min(1),
		SANITY_STUDIO_READ_TOKEN: z.string().min(1),
		SANITY_STUDIO_WRITE_TOKEN: z.string().min(1),
		SANITY_DEPLOY_TOKEN: z.string().min(1),
		SANITY_STUDIO_WEBHOOK_REVALIDATE: z.string().min(1),

		SITE_URL: z.string(),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	// runtimeEnv: {
	//   DATABASE_URL: process.env.DATABASE_URL,
	//   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
	// },
	// For Next.js >= 13.4.4, you can just reference process.env:
	experimental__runtimeEnv: process.env,
})
