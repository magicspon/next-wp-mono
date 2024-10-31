import type { Token } from '@spon/styled-system/tokens'
import { token } from '@spon/styled-system/tokens'

export function getTokenKey(input: Token) {
	const value = token.var(input)

	return value.replace('var(', '').replace(')', '')
}
