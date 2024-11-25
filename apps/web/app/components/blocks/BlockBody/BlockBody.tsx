import { css } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { Portable } from '~/components/Portable'
import type { ComponentsTextPanelBlocksBodyLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = WithPT<ComponentsTextPanelBlocksBodyLayoutFragment>

export function BlockBody({ body, textStyles }: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)

	return (
		<Stack
			data-testid="BlockBody"
			style={vars}
			className={css({
				alignItems: 'var(--align-items, start)',
			})}
		>
			<Portable body={body} />
		</Stack>
	)
}
