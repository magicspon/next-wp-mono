import { describe, expect, it, vi } from 'vitest'
import * as Fn from './createHref'

describe('createHref', () => {
	it('should be invoked', () => {
		const getLegsSpy = vi.spyOn(Fn, 'createHref')
		Fn.createHref({})
		expect(getLegsSpy).toHaveBeenCalled()
	})

	it('should handle external links', () => {
		const external = Fn.createHref({
			_type: 'link',
			_key: '1',
			type: 'external',
			href: 'https://google.com',
		})

		expect(external).toMatchObject({
			href: 'https://google.com',
			rel: 'noopener noreferrer',
			target: '_blank',
		})
	})

	it('should handle internal links', () => {
		expect(
			Fn.createHref({
				_type: 'link',
				_key: '1',
				type: 'internal',
				href: {
					_type: 'string',
					slug: 'hello',
					basePath: 'waffle',
				},
			}),
		).toMatchObject({
			href: '/waffle/hello',
			rel: undefined,
			target: undefined,
		})

		expect(
			Fn.createHref({
				_type: 'link',
				_key: '1',
				type: 'internal',
				href: {
					_type: 'string',
					slug: 'hello',
					basePath: null,
				},
			}),
		).toMatchObject({
			href: '/hello',
			rel: undefined,
			target: undefined,
		})
	})

	it('should handle custom links', () => {
		expect(
			Fn.createHref({
				_type: 'link',
				_key: '1',
				type: 'custom',
				href: '#0',
			}),
		).toMatchObject({
			href: '#0',
			rel: undefined,
			target: undefined,
		})
	})
})
