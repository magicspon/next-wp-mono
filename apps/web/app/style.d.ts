import 'react'

declare module 'react' {
	interface CSSProperties {
		/***
		 * Colours
		 */
		'--background'?: `hsl(${string} ${string}% ${string}%)`
		'--foreground'?: `hsl(${string} ${string}% ${string}%)`

		'--accent'?: `hsl(${string} ${string}% ${string}%)`
		'--accent-foreground'?: `${string} ${string}% ${string}%`

		'--primary'?: `${string} ${string}% ${string}%`
		'--primary-foreground'?: `${string} ${string}% ${string}%`

		'--secondary'?: `${string} ${string}% ${string}%`
		'--secondary-foreground'?: `${string} ${string}% ${string}%`

		'--card'?: `${string} ${string}% ${string}%`
		'--card-foreground'?: `${string} ${string}% ${string}%`

		'--muted'?: `${string} ${string}% ${string}%`
		'--muted-foreground'?: `${string} ${string}% ${string}%`

		'--destructive'?: `${string} ${string}% ${string}%`
		'--destructive-foreground'?: `${string} ${string}% ${string}%`

		'--ring'?: `${string} ${string}% ${string}%`
		'--input'?: `${string} ${string}% ${string}%`
		'--border'?: `${string} ${string}% ${string}%`

		/***
		 * Layout
		 */
		'--scaling'?: `${number}`

		[k: string]: string | number
	}
}
