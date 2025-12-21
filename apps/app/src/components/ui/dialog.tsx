'use client'
import { type AriaDialogProps, useDialog } from '@react-aria/dialog'
import { mergeProps } from '@react-aria/utils'
import type { FocusableElement, PressEvent } from '@react-types/shared'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  createContext,
  type DOMAttributes,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  use,
  useCallback,
  useRef,
  useState,
} from 'react'
import { cn } from '@/utils/ui'
import { Button, type ButtonPropsType } from './button'
import { Overlay } from './overlay'

type DialogContextType = {
  dialogProps: DOMAttributes<FocusableElement>
  titleProps: DOMAttributes<FocusableElement>
  dialogRef: RefObject<HTMLDivElement | null>
  open: boolean
  setOpen: (state: boolean) => void
  onClose: () => void
}

const DialogContext = createContext<DialogContextType | null>(null)

const useDialogContext = () => {
  const context = use(DialogContext)

  if (!context) {
    throw new Error('"useDialogContext" should only be used inside "Dialog"!')
  }

  return context
}

type DialogPropsType = AriaDialogProps & {
  children: ReactNode
  defaultOpen?: boolean
}

const Dialog: FC<DialogPropsType> = ({
  children,
  defaultOpen = false,
  ...props
}) => {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(defaultOpen)

  const { dialogProps, titleProps } = useDialog(props, dialogRef)

  const onClose = useCallback(() => setOpen(false), [])

  return (
    <DialogContext
      value={{
        dialogProps,
        titleProps,
        dialogRef,
        open,
        setOpen,
        onClose,
      }}>
      {children}
    </DialogContext>
  )
}

type DialogTriggerPropsType = Omit<ButtonPropsType, 'onPress' | 'onClick'>

const DialogTrigger: FC<DialogTriggerPropsType> = (props) => {
  const { setOpen } = useDialogContext()
  return (
    <Button
      {...props}
      className={cn('scale-100!',props.className)}
      onPress={() => setOpen(true)}
    />
  )
}

type DialogContentPropsType = VariantProps<typeof dialogContentTypes> & {
  children: ReactNode
}

const dialogContentTypes = cva('[&_p]:text-muted-foreground', {
  variants: {
    type: {
      main: 'bg-card',
      primary: 'bg-primary [&_h3]:text-primary-foreground',
      secondary: 'bg-secondary [&_h3]:text-secondary-foreground',
      tertiary: 'bg-accent [&_h3]:text-accent-foreground',
      alert: 'bg-destructive [&_h3]:text-white [&_p]:text-muted/70',
      border: 'ring ring-ring',
    },
    shape: {
      square: 'rounded-none',
      rounded: 'rounded-md',
    },
    size: {
      base: 'max-w-3/4 max-h-3/5',
      large: 'max-w-4/5 max-h-4/5',
      small: 'max-w-3/5 max-h-2/5',
    },
  },
  defaultVariants: {
    type: 'main',
    size: 'base',
    shape: 'square',
  },
})

const DialogContent: FC<DialogContentPropsType> = ({ children, ...props }) => {
  const { dialogProps, dialogRef, open, onClose } = useDialogContext()

  // for ts only
  props satisfies VariantProps<typeof dialogContentTypes> & {
    className?: string
  }

  if (!open) {
    return
  }

  return (
    <Overlay onClose={onClose}>
      <div
        {...dialogProps}
        className={dialogContentTypes({
          ...props,
        })}
        ref={dialogRef}>
        {children}
      </div>
    </Overlay>
  )
}

type DialogHeaderPropsType = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const DialogHeader: FC<DialogHeaderPropsType> = ({ className, ...props }) => (
  <div
    {...props}
    className={cn('p-2.5', className)}
  />
)

type DialogTitlePropsType = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode
}

const DialogTitle: FC<DialogTitlePropsType> = ({ className, ...props }) => {
  const { titleProps } = useDialogContext()

  return (
    <h3
      {...mergeProps(titleProps, props)}
      className={cn('text-lg font-semibold')}
    />
  )
}

type DialogDescriptionPropsType = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode
}

const DialogDescription: FC<DialogDescriptionPropsType> = ({
  className,
  ...props
}) => (
  <p
    {...props}
    className={cn('text-sm font-medium', className)}
  />
)

type DialogFooterPropsType = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const DialogFooter: FC<DialogFooterPropsType> = ({ className, ...props }) => (
  <div
    {...props}
    className={cn(
      'p-2.5 border-t border-card-foreground flex gap-2',
      className
    )}
  />
)

type DialogActionPropsType = Omit<ButtonPropsType, 'onPress'> &
  (
    | {
        action: 'base'
        onPress:
          | ButtonPropsType['onPress']
          | Promise<ButtonPropsType['onPress']>
      }
    | {
        action: 'cancel'
      }
  )

const DialogAction: FC<DialogActionPropsType> = ({
  action = 'cancel',
  type,
  // @ts-expect-error
  onPress,
  ...props
}) => {
  const { onClose } = useDialogContext()

  const handlePress = useCallback(
    async (e: PressEvent) => {
      if (onPress) {
        await onPress(e)
      }
      onClose()
    },
    [onPress, onClose]
  )

  return (
    <Button
      {...props}
      onPress={handlePress}
      type={action === 'cancel' && type == null ? 'alert' : type}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogAction,
}
