'use client'
import { AriaButtonOptions, useButton } from '@react-aria/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { FC, ReactNode, useRef } from 'react'
import { cn } from '@/utils/ui'

type ButtonPropsType = Omit<
  AriaButtonOptions<'button'>,
  'id' | 'onClick' | 'href' | 'elementType' | 'type'
> &
  VariantProps<typeof buttonTypes> & {
    children: ReactNode
    className?: string
  }

const buttonTypes = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer',
  {
    variants: {
      type: {
        main: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        tertiary: 'bg-accent text-accent-foreground hover:bg-accent/90',
        alert:
          'bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive-50',
        border:
          'border bg-transparent shadow-xs border-ring hover:bg-accent/30 text-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 p-0 rounded-none hover:underline',
      },
      size: {
        base: 'px-4 py-2',
        large: 'px-6 py-3',
        small: 'px-3 py-[0.3rem] rounded-sm',
        logo: 'size-9 p-1',
        'logo-large': 'size-12 p-1',
        'logo-small': 'size-8 p-1',
      },
    },
    defaultVariants: {
      type: 'main',
      size: 'base',
    },
  }
)

const Button: FC<ButtonPropsType> = ({ children, type, size, ...props }) => {
  const bRef = useRef<HTMLButtonElement>(null)

  const { buttonProps, isPressed } = useButton(props, bRef)

  return (
    <button
      {...buttonProps}
      className={cn(buttonTypes({ type, size }), {
        'scale-95': isPressed,
      })}
      ref={bRef}>
      {children}
    </button>
  )
}

export { Button }
