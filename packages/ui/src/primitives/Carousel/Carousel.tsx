import { Slot } from '@radix-ui/react-slot'
import type { EmblaViewportRefType } from 'embla-carousel-react'
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from 'embla-carousel-react'
import * as React from 'react'
import { Flex } from '../../layout/Flex'

type EmblaCarouselType = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type EmblaOptionsType = UseCarouselParameters[0]
type EmblaPluginType = UseCarouselParameters[1]

/***
 * <Carousel.Root
 *		options={{
 *			active: true,
 *			axis: 'x',
 *			align: 'center',
 *			slidesToScroll: 1,
 *		}}
 *	>
 *		<Carousel.Prev>Prev</Carousel.Prev>
 *		<Carousel.Next>Next</Carousel.Next>
 *		<Carousel.Content>
 *			<Carousel.Viewport>
 *				<Carousel.Item className="w-full flex-shrink-0">A</Carousel.Item>
 *				<Carousel.Item className="w-full flex-shrink-0">B</Carousel.Item>
 *				<Carousel.Item className="w-full flex-shrink-0">C</Carousel.Item>
 *				<Carousel.Item className="w-full flex-shrink-0">D</Carousel.Item>
 *			</Carousel.Viewport>
 *		</Carousel.Content>
 *		<Carousel.Dots>
 *			<Carousel.Dot index={0}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={1}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={2}>Dot</Carousel.Dot>
 *			<Carousel.Dot index={3}>Dot</Carousel.Dot>
 *		</Carousel.Dots>
 *	</Carousel.Root>
 */

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
}

type UseDotButtonType = {
	selectedIndex: number
	scrollSnaps: number[]
	onDotButtonClick: (index: number) => void
}

export const useDotButton = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaRef: EmblaCarouselType) => void,
): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = React.useState(0)
	const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

	const onDotButtonClick = React.useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
			if (onButtonClick) onButtonClick(emblaApi)
		},
		[emblaApi, onButtonClick],
	)

	const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
		if (!emblaApi) return
		setScrollSnaps(emblaApi.scrollSnapList())
	}, [])

	const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
		if (!emblaApi) return
		setSelectedIndex(emblaApi.selectedScrollSnap())
	}, [])

	React.useEffect(() => {
		if (!emblaApi) return

		onInit(emblaApi)
		onSelect(emblaApi)
		emblaApi.on('reInit', onInit)
		emblaApi.on('reInit', onSelect)
		emblaApi.on('select', onSelect)
	}, [emblaApi, onInit, onSelect])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	}
}

type TCarouselContext = UsePrevNextButtonsType &
	UseDotButtonType & { emblaRef: EmblaViewportRefType }

const CarouselContext = React.createContext<TCarouselContext>(null!)

export function useCarousel() {
	return React.useContext(CarouselContext)
}

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

	const onPrevButtonClick = React.useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
		if (onButtonClick) onButtonClick(emblaApi)
	}, [emblaApi, onButtonClick])

	const onNextButtonClick = React.useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
		if (onButtonClick) onButtonClick(emblaApi)
	}, [emblaApi, onButtonClick])

	const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
		if (!emblaApi) return
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	React.useEffect(() => {
		if (!emblaApi) return

		onSelect(emblaApi)
		emblaApi.on('reInit', onSelect)
		emblaApi.on('select', onSelect)
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	}
}

export type TCarouselProps = {
	options?: EmblaOptionsType
	plugins?: EmblaPluginType
	children?: React.ReactNode
}

export function Root({ options, plugins, children }: TCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi)

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	const context = React.useMemo(() => {
		return {
			prevBtnDisabled,
			nextBtnDisabled,
			onPrevButtonClick,
			onNextButtonClick,
			selectedIndex,
			scrollSnaps,
			onDotButtonClick,
			emblaRef,
		}
	}, [
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
		emblaRef,
	])

	return (
		<CarouselContext.Provider value={context}>
			{children}
		</CarouselContext.Provider>
	)
}

export function Content({ children }: React.ComponentProps<'div'>) {
	const { emblaRef } = useCarousel()

	return <div ref={emblaRef}>{children}</div>
}

export const Prev = React.forwardRef<
	React.ElementRef<'button'>,
	React.ComponentProps<'button'> & { asChild?: boolean }
>(function NextButton({ asChild, ...props }, ref) {
	const { onPrevButtonClick, prevBtnDisabled } = useCarousel()
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			ref={ref}
			disabled={prevBtnDisabled}
			type="button"
			onClick={(e) => {
				onPrevButtonClick()
				props.onClick?.(e as any)
			}}
			{...props}
		/>
	)
})

export const Next = React.forwardRef<
	React.ElementRef<'button'>,
	React.ComponentProps<'button'> & { asChild?: boolean }
>(function Next({ asChild, ...props }, ref) {
	const { onNextButtonClick, nextBtnDisabled } = useCarousel()

	const Comp = asChild ? Slot : 'button'
	//
	return (
		<Comp
			ref={ref}
			disabled={nextBtnDisabled}
			type="button"
			onClick={(e) => {
				onNextButtonClick()
				props.onClick?.(e as any)
			}}
			{...props}
		/>
	)
})

export const Viewport = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'>
>(function Viewport({ children, ...props }, ref) {
	return (
		<Flex {...props} ref={ref}>
			{children}
		</Flex>
	)
})

export const Dots = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'>
>(function Dots({ children, ...props }, ref) {
	return (
		<Flex {...props} ref={ref}>
			{children}
		</Flex>
	)
})

export const Dot = React.forwardRef<
	React.ElementRef<'button'>,
	React.ComponentProps<'button'> & { value: number }
>(function Dot({ value, ...props }, ref) {
	const { onDotButtonClick, selectedIndex } = useCarousel()
	return (
		<button
			ref={ref}
			data-state={selectedIndex === value ? 'active' : 'inactive'}
			type="button"
			onClick={(e) => {
				onDotButtonClick(value)
				props.onClick?.(e)
			}}
			{...props}
		/>
	)
})

export const Item = React.forwardRef<
	React.ElementRef<'div'>,
	React.ComponentProps<'div'> & { value: number }
>(function NextButton({ value, ...props }, ref) {
	const { selectedIndex } = useCarousel()

	return (
		<div
			ref={ref}
			data-state={selectedIndex === value ? 'active' : 'inactive'}
			{...props}
		/>
	)
})
