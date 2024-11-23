import { useInfiniteQuery } from '@tanstack/react-query'
import { fetcher } from '@spon/utils/fetcher'

export type TInfinitePostsArgs<T> = {
	posts: T[]
	cursor?: string
	queryKey?: string
}

export function useInfinitePosts<T>({
	cursor,
	posts,
	queryKey = 'listing',
}: TInfinitePostsArgs<T>) {
	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
		any,
		Error,
		{ pages: { pages: T[] }[] }
	>({
		queryKey: [queryKey],
		queryFn: async ({ pageParam }) => {
			const searchParams = new URLSearchParams({
				cursor: String(pageParam),
			})
			return fetcher(`/api/paginate/posts?${searchParams.toString()}`)
		},
		initialPageParam: 0,
		getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
		getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
		initialData: {
			pages: [{ pages: posts, nextId: cursor ?? undefined }],
			pageParams: cursor ? [0, 1] : [],
		},
	})

	const entries = data.pages.flatMap((p) => p.pages)

	return { fetchNextPage, hasNextPage, isFetching, entries }
}
