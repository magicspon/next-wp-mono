import plugin from 'tailwindcss/plugin'

export const extraVariants = plugin(({ addVariant }) => {
	addVariant('hocus', ['&:hover', '&:focus'])
	addVariant('between', `& > *:not(:last-child)`)
	addVariant('child', `& > *`)
	addVariant(
		'placeholder-unfocus',
		`&:placeholder-shown:not(:focus)::placeholder`,
	)
	addVariant('placeholder-not-shown', `&:not(:placeholder-shown)`)
	addVariant(
		'placeholder-visible',
		`:merge(.peer):placeholder-shown:not(:focus) ~ &`,
	)
	addVariant('sibling', `&:not(:last-child)`)

	// addVariant('child-block', `& > *:has(+[data-group])`)
	// addVariant('before-block', `&:has(+[data-group])`)
	// addVariant('before-copy', `&:has(+[data-intent])`)
})
