type ErrorName =
	| 'INPUT_ERROR'
	| 'OUTPUT_ERROR'
	| 'SYSTEM_ERROR'
	| 'UNKNOWN_ERROR'
	| 'NOT_FOUND'
	| 'NO_AUTH'

export class ProjectError extends Error {
	override name: ErrorName
	override message: string
	override cause: unknown

	constructor({
		code,
		message,
		cause,
	}: {
		code: ErrorName
		message: string
		cause?: unknown
	}) {
		super()
		this.message = message
		this.cause = cause
		this.name = code
	}
}
