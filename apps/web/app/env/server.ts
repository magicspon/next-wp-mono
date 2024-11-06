import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		GRAPHQL_ENDPOINT: z.string().min(1),
		GRAPHQL_JWT_AUTH_SECRET_KEY: z.string().min(1),
		GRAPHQL_API_AUTH_SECRET_KEY: z.string().min(1),
		HEADLESS_SECRET: z.string().min(1),
		WP_DOMAIN: z.string().min(1),
		WP_USER: z.string().min(1),
		WP_APP_PASS: z.string().min(1),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	// runtimeEnv: {
	//   DATABASE_URL: process.env.DATABASE_URL,
	//   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
	// },
	// For Next.js >= 13.4.4, you can just reference process.env:
	experimental__runtimeEnv: process.env,
})
