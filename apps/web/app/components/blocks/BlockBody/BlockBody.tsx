import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { Portable } from '~/components/Portable'
import type { ComponentsTextPanelBlocksBodyLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = WithPT<ComponentsTextPanelBlocksBodyLayoutFragment>

export function BlockBody({ body, style }: TBlockBodyProps) {
	return (
		<Stack
			data-testid="BlockBody"
			style={typography(style?.typography)}
			className={css({
				alignItems: 'var(--align-items, start)',
				gap: 'var(--gap, token(spacing.4))',
				px: 'var(--padding-x, token(spacing.4))',
				py: 'var(--padding-y, token(spacing.4))',
			})}
		>
			<Portable body={body} />
		</Stack>
	)
}
