'use client'
import { type AriaTextFieldOptions, useTextField } from '@react-aria/textfield'
import { cva, type VariantProps } from 'class-variance-authority'
import { type FC, type ReactNode, useRef } from 'react'
import { cn } from '@/utils/ui'

type InputPropsType = Omit<
  AriaTextFieldOptions<'input'>,
  'id' | 'onClick' | 'href' | 'elementType' | 'type'
> &
  VariantProps<typeof inputTypes> & {
    label: string | ReactNode
    className?: string
    asChild?: boolean
    mode?: AriaTextFieldOptions<'input'>['type']
  }

const inputTypes = cva('py-2 border-ring relative flex items-end', {
  variants: {
    type: {
      main: 'bg-background text-foreground',
      primary: 'bg-primary-foreground text-primary',
      secondary: 'bg-secondary text-secondary-foreground',
      tertiary: 'bg-accent text-accent-foreground hover:bg-accent/90',
      alert: 'bg-destructive text-white',
    },
    round: {
      full: 'border rounded-md px-3',
      standard: 'border-b',
    },
  },
  defaultVariants: {
    type: 'main',
    round: 'full',
  },
})

const Input: FC<InputPropsType> = ({
  type,
  round,
  className,
  mode = 'text',
  ...props
}) => {
  const { label } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const { inputProps, labelProps } = useTextField(props, inputRef)

  return (
    <div
      className={cn(
        inputTypes({
          type,
          round,
          className,
        })
      )}>
      <input
        {...inputProps}
        className="peer outline-none"
        placeholder=" "
      />
      <label
        {...labelProps}
        className="absolute px-2 bg-inherit pointer-events-none transition-all duration-250 text-sm translate-x-1/5 -translate-y-[calc(100%+.5em)] peer-placeholder-shown:translate-x-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus-within:text-sm peer-focus-within:translate-x-1/5 peer-focus-within:-translate-y-[calc(100%+.5em)]">
        {label}
      </label>
    </div>
  )
}

export { Input }
