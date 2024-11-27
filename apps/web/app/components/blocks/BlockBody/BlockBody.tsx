import { css, cx } from '@spon/styled-system/css'
import { Stack } from '@spon/ui/layout/Stack'
import { Portable } from '~/components/Portable'
import type { ComponentsTextPanelBlocksBodyLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { typography } from '~/utils/style/typography'

type TBlockBodyProps = WithPT<ComponentsTextPanelBlocksBodyLayoutFragment> & {
	components?: React.ComponentProps<typeof Portable>['components']
	className?: string
}

export function BlockBody({
	body,
	textStyles,
	components,
	className,
}: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)

	return (
		<>
			<Stack
				data-testid="BlockBody"
				style={vars}
				className={cx(
					className,
					css({
						alignItems: 'var(--align-items, start)',
					}),
				)}
			>
				<Portable body={body} components={components} style={textStyles} />
			</Stack>
		</>
	)
}
