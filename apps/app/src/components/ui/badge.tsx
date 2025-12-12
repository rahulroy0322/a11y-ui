import { cva, type VariantProps } from 'class-variance-authority'
import type { FC, ReactNode } from 'react'
import { cn } from '@/utils/ui'
import { Slot } from './slot'

type BadgePropsType = VariantProps<typeof badgeTypes> & {
  children: ReactNode
  className?: string
  asChild?: boolean
}

const badgeTypes = cva(
  'inline-flex items-center justify-center rounded-full font-medium w-fit whitespace-nowrap shrink-0 gap-1 border-transparent',
  {
    variants: {
      type: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        tertiary: 'bg-accent text-accent-foreground hover:bg-accent/90',
        alert:
          'bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive-50',
        border:
          'border text-foreground border-primary hover:bg-accent/90 hover:text-accent-foreground/90',
      },
      size: {
        base: 'px-2 py-0.5 text-xs',
        large: 'px-3 py-1 text-base',
        small: 'px-1.5 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      type: 'primary',
      size: 'base',
    },
  }
)

const Badge: FC<BadgePropsType> = ({
  asChild = false,
  type,
  size,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      {...props}
      className={cn(
        badgeTypes({
          className,
          type,
          size,
        })
      )}
    />
  )
}

export { Badge }
