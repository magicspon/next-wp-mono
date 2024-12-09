// https://saas-ui.dev/blog/nextjs-create-page-helper-with-loader-pattern
// source: https://gist.github.com/magicspon/c1647cf91909808be0a1eed5448bb56d
import type { Metadata, ResolvingMetadata } from 'next'
import type { AnyZodObject, z } from 'zod'

type InferParams<Params> = Params extends readonly string[]
	? Record<Params[number], string>
	: Params extends AnyZodObject
		? z.infer<Params>
		: unknown

type LoaderFn<
	Params extends readonly string[] | AnyZodObject,
	SearchParams extends readonly string[] | AnyZodObject,
> = (args: {
	params: InferParams<Params>
	searchParams: InferParams<SearchParams>
}) => Promise<any>

type InferLoaderData<Loader> = Loader extends (args: any) => Promise<infer T>
	? T
	: unknown

export interface CreatePageProps<
	Params extends readonly string[] | AnyZodObject,
	SearchParams extends readonly string[] | AnyZodObject,
	Loader extends LoaderFn<Params, SearchParams> = LoaderFn<
		Params,
		SearchParams
	>,
> {
	params?: Params
	searchParams?: SearchParams
	loader?: Loader
	metadata?:
		| Metadata
		| ((
				args: {
					params: InferParams<Params>
					searchParams: InferParams<SearchParams>
					data: InferLoaderData<Loader>
				},
				parent: ResolvingMetadata,
		  ) => Promise<Metadata>)
	component: React.ComponentType<{
		params: InferParams<Params>
		searchParams?: InferParams<SearchParams>
		data: InferLoaderData<Loader>
	}>
}

async function parseParams<Schema extends readonly string[] | AnyZodObject>(
	_params: Promise<Record<string, string>>,
	schema?: Schema,
) {
	const params = await _params

	if (schema && 'parse' in schema) {
		return schema.parse(params) as InferParams<Schema>
	}

	return params as InferParams<Schema>
}

export const createPage = <
	const Params extends readonly string[] | AnyZodObject,
	const SearchParams extends readonly string[] | AnyZodObject,
	Loader extends LoaderFn<Params, SearchParams> = LoaderFn<
		Params,
		SearchParams
	>,
>(
	props: CreatePageProps<Params, SearchParams, Loader>,
) => {
	const {
		params: paramsSchema,
		searchParams: searchParamsSchema,
		component: PageComponent,
		loader,
		metadata,
	} = props

	// We don't really care about the types here since it's internal

	async function Page(props: any) {
		const params = await parseParams(props.params, paramsSchema)
		const searchParams = await parseParams(
			props.searchParams,
			searchParamsSchema,
		)

		let pageProps: any = {
			params,
			searchParams,
		}

		if (typeof loader === 'function') {
			const data = await loader(pageProps)

			pageProps = {
				...pageProps,
				data,
			}
		}

		return <PageComponent {...pageProps} />
	}

	if (typeof metadata === 'function') {
		return {
			generateMetadata: async (
				{
					params,
					searchParams,
				}: {
					params: InferParams<Params>
					searchParams: InferParams<SearchParams>
				},
				parent: ResolvingMetadata,
			) => {
				const data =
					typeof loader === 'function'
						? await loader({
								params,
								searchParams,
							})
						: undefined

				return metadata(
					{
						params,
						searchParams,
						data,
					},
					parent,
				)
			},
			Page,
		}
	}

	return {
		metadata,
		Page,
	}
}
