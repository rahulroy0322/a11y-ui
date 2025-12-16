'use client'

import { useFocusRing } from '@react-aria/focus'
import {
  type AriaSliderProps,
  useSlider,
  useSliderThumb,
} from '@react-aria/slider'
import { mergeProps } from '@react-aria/utils'
// // TODO!
// import { useNumberFormatter } from 'react-aria'
import { useSliderState } from '@react-stately/slider'
import {
  DOMAttributes,
  FocusableElement,
  Orientation,
} from '@react-types/shared'
import { cva, VariantProps } from 'class-variance-authority'
import { FC, useRef } from 'react'
import { cn } from '@/utils/ui'

type ThumbPropsType = DOMAttributes<FocusableElement>

const Thumb: FC<ThumbPropsType> = ({ className, ...props }) => (
  <span
    {...props}
    className={cn(
      'size-5 transition-colors duration-100 top-1/2 rounded-full',
      className
    )}
  />
)

type SliderPropsType = Omit<AriaSliderProps, 'id' | 'label'> &
  VariantProps<typeof sliderTypes> &
  VariantProps<typeof trackTypes> &
  VariantProps<typeof thumbTypes> & {
    name: string
    label?: string
    className?: string
    formatOptions?: Intl.NumberFormatOptions
  }

const getNumberFormatter = (options: Intl.NumberFormatOptions | undefined) =>
  new Intl.NumberFormat(undefined, options)

const sliderTypes = cva('flex w-[300px] gap-1.5', {
  variants: {
    orientation: {
      horizontal: 'flex-col',
      vertical: '',
    } satisfies Record<Orientation, string>,
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const trackTypes = cva('cursor-pointer relative', {
  variants: {
    type: {
      main: 'bg-input/80',
      primary: 'bg-primary dark:bg-primary/80',
      secondary: 'bg-secondary dark:bg-secondary/80',
      tertiary: 'bg-accent dark:bg-accent-foreground/80',
      alert: 'bg-destructive! dark:bg-destructive/80',
      border: 'ring ring-ring bg-transparent',
    },
    orientation: {
      horizontal: 'w-full h-[5px]',
      vertical: '',
    } satisfies Record<Orientation, string>,
    shape: {
      square: 'rounded-none',
      rounded: 'rounded-lg',
    },
  },
  defaultVariants: {
    type: 'main',
    orientation: 'horizontal',
    shape: 'square',
  },
})

const thumbTypes = cva(
  'data-[grabing="true"]:scale-95 data-[focus="true"]:scale-110 data-[focus="true"]:bg-primary/60',
  {
    variants: {
      type: {
        main: 'bg-input/80 data-[grabing="true"]:bg-input',
        primary: 'bg-primary/80 data-[grabing="true"]:bg-primary',
        secondary: 'bg-secondary/80 data-[grabing="true"]:bg-secondary',
        tertiary: 'bg-accent/80 data-[grabing="true"]:bg-accent',
        alert: 'bg-destructive/80 data-[grabing="true"]:bg-destructive',
        border: 'ring ring-ring bg-transparent',
      },
      shape: {
        square: 'rounded-none',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      type: 'main',
      shape: 'square',
    },
  }
)

const Slider: FC<SliderPropsType> = ({
  name,
  type,
  shape,
  className,
  formatOptions,
  ...props
}) => {
  const { orientation } = props
  const trackRef = useRef(null)
  const numberFormatter = getNumberFormatter(formatOptions)
  // const numberFormatter =
  //   useNumberFormatter(
  //     props.formatOptions
  //   );
  const state = useSliderState({
    ...props,
    numberFormatter,
  })
  const {
    groupProps,
    trackProps: { style: _, ...trackProps },
    labelProps,
  } = useSlider(props, state, trackRef)

  //
  let inputRef = useRef(null)
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index: 0,
      trackRef,
      inputRef,
      name: 'kak',
    },
    state
  )

  let { focusProps, isFocusVisible } = useFocusRing()

  return (
    <div
      {...groupProps}
      className={sliderTypes({
        orientation,
        className,
      })}>
      {props.label && <label {...labelProps}>{props.label}</label>}

      <div className="relative">
        <div
          {...trackProps}
          className={trackTypes({
            type,
            orientation,
            shape,
          })}
          ref={trackRef}>
          <input
            {...mergeProps(inputProps, focusProps)}
            className="absolute h-full w-full cursor-pointer opacity-0"
            ref={inputRef}
          />
        </div>
        <Thumb
          {...thumbProps}
          className={thumbTypes({
            type,
            shape,
          })}
          data-focus={isFocusVisible}
          data-grabing={isDragging}
        />
      </div>
    </div>
  )
}

export { Slider }
