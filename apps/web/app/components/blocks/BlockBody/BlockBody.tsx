import { css, cx } from '@spon/styled-system/css'
import { Portable } from '~/components/Portable'
import type { ComponentsTextPanelBlocksBodyLayoutFragment } from '~/schema/generated.graphql'
import type { WithPT } from '~/utils/portable/htmlToPortableText'
import { layout as layoutStyle } from '~/utils/style/layout'
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
	layout,
}: TBlockBodyProps) {
	const { vars } = typography(textStyles?.typography)
	const style = layoutStyle(layout)

	return (
		<>
			<div
				data-testid="BlockBody"
				style={{ ...vars, ...style }}
				className={cx(
					className,
					css({
						display: 'flex',
						flexDir: 'column',
						alignItems: 'var(--align-items, stretch)',
						gap: 'var(--gap, token(spacing.4))',
						textAlign: 'var(--text-align, left)',
					}),
				)}
			>
				<Portable body={body} components={components} style={textStyles} />
			</div>
		</>
	)
}
