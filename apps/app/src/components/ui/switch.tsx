'use client'
import { useFocusRing } from '@react-aria/focus'
import { type AriaSwitchProps, useSwitch } from '@react-aria/switch'
import { useToggleState } from '@react-stately/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { type FC, type ReactNode, useRef } from 'react'

type SwitchPropsType = Omit<
  AriaSwitchProps,
  'id' | 'onClick' | 'href' | 'elementType' | 'type'
> &
  VariantProps<typeof switchTypes> & {
    children: ReactNode
    className?: string
    asChild?: boolean
  }

const switchTypes = cva(
  'inline-flex items-center border-none ring ring-input shadow-xs peer-disabled:opacity-50 peer-disabled:cursor-not-allowed  peer-focus-within:ring-ring/50 transition-all cursor-pointer peer-checked:[&>div]:translate-x-[calc(100%-4px)] peer-focus-within:ring-2 duration-400',
  {
    variants: {
      type: {
        main: 'dark:[&>div]:bg-input/60 bg-input dark:bg-input/80',
        primary:
          'dark:[&>div]:bg-primary-foreground/60 bg-primary dark:bg-primary/80',
        secondary:
          'dark:[&>div]:bg-secondary-foreground/60 bg-secondary dark:bg-secondary/80',
        tertiary:
          'dark:[&>div]:bg-accent-foreground/60 bg-accent dark:bg-accent/80',
        alert:
          'dark:[&>div]:bg-foreground/60 bg-input ring-destructive! ring-2 dark:bg-input/80 peer-checked:bg-destructive dark:peer-checked:bg-destructive/80 [&>div]:bg-destructive peer-checked:[&>div]:bg-input',
        border:
          'ring-ring bg-transparent [&>div]:bg-transparent! [&>div]:ring-ring',
      },
      size: {
        base: 'p-0.5 w-8',
        large: 'p-1 w-9',
      },
      shape: {
        square: 'rounded-none',
        rounded: 'rounded-sm',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      type: 'main',
      size: 'base',
      shape: 'square',
    },
  }
)

const Switch: FC<SwitchPropsType> = ({
  asChild = false,
  type,
  size,
  shape,
  className,
  ...props
}) => {
  const state = useToggleState(props)
  const inputRef = useRef(null)
  const { inputProps } = useSwitch(props, state, inputRef)
  const { focusProps } = useFocusRing()

  return (
    <label className="flex items-center gap-2">
      <input
        {...inputProps}
        {...focusProps}
        className="peer sr-only"
        tabIndex={0}
      />

      <div
        className={switchTypes({
          type,
          shape,
          size,
          className,
        })}>
        <div className="bg-background dark:bg-foreground size-4 rounded-[inherit] pointer-events-none translate-x-0 transition-all duration-400 ring ring-transparent" />
      </div>
      {props.children}
    </label>
  )
}

export { Switch }
