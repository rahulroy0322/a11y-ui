'use client'

import { FocusScope } from '@react-aria/focus'
import type { FocusableElement } from '@react-types/shared'
import { type DOMAttributes, forwardRef, type ReactNode } from 'react'

type OverlayPropsType = DOMAttributes<FocusableElement> & {
  children: ReactNode
  onClose: () => void
  overlay?: string
}

const Overlay = forwardRef<HTMLDivElement, OverlayPropsType>(
  ({ onClose, overlay = 'overlay', ...props }, ref) => (
    <FocusScope restoreFocus>
      <div
        {...props}
        className="fixed bg-gray-500/50 inset-0 scale-100 flex items-center justify-center"
        data-overlay={overlay}
        onClick={(e) => {
          const attr = (e.target as HTMLDivElement)?.getAttribute?.(
            `data-overlay`
          )
          if (attr === overlay) {
            onClose()
          }
        }}
        ref={ref}
      />
    </FocusScope>
  )
)

export { Overlay }
