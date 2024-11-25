import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { Portable } from '~/components/Portable'
import type { ComponentsTextPanelBlocksBodyLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = WithPT<ComponentsTextPanelBlocksBodyLayoutFragment> & {
	components?: React.ComponentProps<typeof Portable>['components']
}

export function BlockBody({ body, textStyles, components }: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)

	return (
		<Stack
			data-testid="BlockBody"
			style={vars}
			className={css({
				alignItems: 'var(--align-items, start)',
			})}
		>
			<Portable body={body} components={components} />
		</Stack>
	)
}
