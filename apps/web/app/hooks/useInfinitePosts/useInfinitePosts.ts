import { useInfiniteQuery } from '@tanstack/react-query'
import { fetcher } from '@spon/utils/fetcher'
import { POSTS_PER_PAGE } from '~/config'

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
		queryFn: async ({ pageParam }) =>
			fetcher(`/api/paginate/posts/${pageParam}/${POSTS_PER_PAGE}`),
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
