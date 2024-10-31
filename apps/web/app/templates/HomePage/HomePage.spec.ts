import { expect, test } from '@playwright/test'

test.describe('<HomePage />', () => {
	test('should render', async ({ page }) => {
		await page.goto('http://localhost:3000/')
		await expect(page.getByTestId('HomePage')).toBeVisible()
	})
})
