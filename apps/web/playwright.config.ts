import type { PlaywrightTestConfig } from '@playwright/test'
import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config({ path: './env.local' })

const config: PlaywrightTestConfig = {
	testDir: './src',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 3,
	reporter: 'html',
	testMatch: '**/*.spec.ts',
	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
}

if (process.env.CI) {
	config.webServer = {
		command: 'npm start',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	}
}

export default defineConfig(config)
