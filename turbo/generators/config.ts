import type { PlopTypes } from '@turbo/gen'
import { component } from './component'
import { context } from './context'
import { fn } from './fn'
import { hook } from './hook'
import { page } from './page'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	const prompts = [component, fn, hook, context, page]

	prompts.forEach((prompt) => {
		prompt(plop)
	})
}
