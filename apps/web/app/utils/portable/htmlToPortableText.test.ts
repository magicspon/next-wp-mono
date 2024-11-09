import { describe, expect, it, vi } from 'vitest'
import * as Fn from './htmlToPortableText'

describe('htmlToPortableText', async () => {
	it('should be invoked', async () => {
		const getLegsSpy = vi.spyOn(Fn, 'htmlToPortableText')
		Fn.htmlToPortableText({
			raw: `<h1>Hello world</h1>\n<p>I am a <strong>bold word. </strong>And this is a <a href="https://localhost:3000/parent/">link</a>.</p>\n`,
		})
		expect(getLegsSpy).toHaveBeenCalled()
	})
})
