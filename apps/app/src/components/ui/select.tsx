'use client'

import { useButton } from '@react-aria/button'
import { FocusScope } from '@react-aria/focus'
import { useFocus } from '@react-aria/interactions'
import { useListBox, useOption } from '@react-aria/listbox'
import { useOverlay } from '@react-aria/overlays'
import { AriaSelectOptions, HiddenSelect, useSelect } from '@react-aria/select'
import { mergeProps } from '@react-aria/utils'
import { Item } from '@react-stately/collections'
import {
  SelectState,
  SelectStateOptions,
  useSelectState,
} from '@react-stately/select'
import { ItemProps, Node } from '@react-types/shared'
import { ChevronDown } from 'lucide-react'
import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  use,
  useRef,
  useState,
} from 'react'
import { cn } from '@/utils/ui'
import { Button, ButtonPropsType } from './button'

type SelectContextType = {
  state: SelectState<object, 'single'>
  props: AriaSelectOptions<object, 'single'>
  triggerRef: RefObject<HTMLButtonElement>
}

const SelectContext = createContext<SelectContextType | null>(null)

const useSelectContext = () => {
  const context = use(SelectContext)

  if (!context) {
    throw new Error('"useSelectContext" should only be used inside "Select"!')
  }

  return context
}

type SelectPropsType = SelectStateOptions<object, 'single'> & {
  children: ReactNode
  trigger: ReactNode
  className?: string
  name?: string
}

const Select: FC<SelectPropsType> = ({ trigger, className, ...props }) => {
  const state = useSelectState(props)

  const ref = useRef<HTMLButtonElement>(null)
  const { labelProps } = useSelect(props, state, ref)

  return (
    <SelectContext
      value={{
        props,
        state,
        triggerRef: ref as unknown as RefObject<HTMLButtonElement>,
      }}>
      <div className={cn('flex gap-2 items-center w-fit', className)}>
        <label {...labelProps}>{props.label}</label>
        <HiddenSelect
          label={props.label}
          name={props.name}
          state={state}
          triggerRef={ref}
        />
        {trigger}
        {state.isOpen && <SelectMenu />}
      </div>
    </SelectContext>
  )
}

type SelectTriggerPropsType = Omit<ButtonPropsType, 'asChild'> & {
  children: ReactNode
}

const SelectTrigger: FC<SelectTriggerPropsType> = ({
  children,
  className,
  ..._props
}) => {
  const { state, props, triggerRef } = useSelectContext()

  const { triggerProps, valueProps } = useSelect(props, state, triggerRef)

  const { buttonProps } = useButton(triggerProps, triggerRef)

  return (
    <Button
      // can over write by user
      size={'small'}
      type={'border'}
      {..._props}
      asChild
      className={cn('gap-1 items-end', className)}>
      <button
        {...buttonProps}
        ref={triggerRef}>
        <span {...valueProps}>
          {state.selectedItem ? state.selectedItem.rendered : children}
        </span>
        <ChevronDown
          className="text-muted-foreground size-5"
          size={20}
        />
      </button>
    </Button>
  )
}

const SelectMenu: FC = () => {
  const { state } = useSelectContext()
  const ulRef = useRef<HTMLUListElement>(null)

  const { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy as unknown as boolean,
      disallowEmptySelection: true,
    },
    state,
    ulRef
  )

  const overlayRef = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  )

  return (
    <FocusScope restoreFocus>
      <Button
        asChild
        onPress={state.close}
        size={'unknown' as 'base'}
        type={'unknown' as 'primary'}>
        <div
          {...overlayProps}
          className="fixed bg-gray-500/50 inset-0 scale-100"
          ref={overlayRef}>
          <ul
            {...mergeProps(listBoxProps)}
            className="w-3/5 py-2 max-h-3/4 overflow-auto bg-background/90 rounded-md ring ring-ring shadow-md select-none"
            ref={ulRef}>
            {[...state.collection].map((item) => (
              <SelectItemImpl
                item={item}
                key={item.key}
              />
            ))}
          </ul>
        </div>
      </Button>
    </FocusScope>
  )
}

type SelectItemImplPropsType = {
  item: Node<object>
}

const SelectItemImpl: FC<SelectItemImplPropsType> = ({ item }) => {
  const { state } = useSelectContext()

  const ref = useRef<HTMLLIElement>(null)

  const isDisabled = state.disabledKeys.has(item.key)
  const isSelected = state.selectionManager.isSelected(item.key)
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    },
    state,
    ref
  )

  const [isFocused, setFocused] = useState(false)
  const { focusProps } = useFocus({
    onFocusChange: setFocused,
  })

  const {
    className,
    focusedClassName = '',
    selectedClassName = '',
  } = item.props as {
    className?: string
    focusedClassName?: string
    selectedClassName?: string
  }

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      className={cn(
        'bg-transparent px-2 py-1 cursor-pointer outline-none border-none',
        {
          'bg-gray-400': isFocused,
        },
        {
          'bg-violet-800': isSelected,
        },
        {
          'text-background': isSelected || isFocused,
        },
        {
          [focusedClassName]: isFocused,
        },
        {
          [selectedClassName]: isSelected,
        },
        className
      )}
      ref={ref}>
      {item.rendered}
    </li>
  )
}

type SelectItemPropsType = Omit<ItemProps<object>, 'children' | 'textValue'> & {
  className?: string
  focusedClassName?: string
  selectedClassName?: string
} & (
    | {
        children: string
        textValue?: string
      }
    | {
        children: ReactNode
        textValue: string
      }
  )

const SelectItem: FC<SelectItemPropsType> = Item as FC<SelectItemPropsType>

export { Select, SelectTrigger, SelectItem }
