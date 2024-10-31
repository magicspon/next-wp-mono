import bundleAnalyzerPlugin from '@next/bundle-analyzer'
import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'

// this tool allows us to import and execute typescript from within a regular node file
const jiti = createJiti(fileURLToPath(import.meta.url))

// validate the client and server secrets
jiti('./app/env/server')
jiti('./app/env/client')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	compiler: {
		removeConsole:
			process.env.VERCEL_ENV === 'production' ? { exclude: ['error'] } : false,
		reactRemoveProperties: { properties: ['^data-test$'] },
	},

	transpilePackages: [
		'@spon/cms',
		'@spon/hooks',
		'@spon/tailwind-config',
		'@spon/ui',
		'@spon/utils',
	],

	eslint: {
		ignoreDuringBuilds: !!process.env.CI,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
		minimumCacheTTL: 31536000,
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	redirects: async () => {
		const mod = await jiti.import('@spon/cms/utils/getRedirects')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return mod.getRedirects()
	},
}

const withBundleAnalyzer = bundleAnalyzerPlugin({
	enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
