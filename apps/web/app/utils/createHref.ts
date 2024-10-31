import type {
	TInternalLink,
	TLinkTypes,
} from '@spon/cms/queries/fragments/link.fragment'

const createInternalUrl = (link: TInternalLink['href']) => {
	return `/${[link?.basePath, link?.slug].filter(Boolean).join('/')}`
}

// adding the record type to fix a shitty ts warning
export function createHref(link: TLinkTypes | Record<string, never>) {
	const external = link.type === 'external'
	const href =
		typeof link.href === 'string' ? link.href : createInternalUrl(link.href)

	return {
		href,
		target: external ? '_blank' : undefined,
		rel: external ? 'noopener noreferrer' : undefined,
	}
}
