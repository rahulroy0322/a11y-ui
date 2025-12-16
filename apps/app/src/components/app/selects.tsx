'use client'
import { FC } from 'react'
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select'

const SelectsComponent: FC = () => {
  return (
    <div className="flex flex-col gap-6 w-3/4 max-w-xl">
      <Select
        label="Favorite Color"
        trigger={<SelectTrigger>Select a Color</SelectTrigger>}>
        <SelectItem textValue="Red">
          <div>Inside Cotent</div>
        </SelectItem>
        <SelectItem selectedClassName="text-orange-600">
          selected class name
        </SelectItem>
        <SelectItem>Green</SelectItem>
        <SelectItem>Blue</SelectItem>
        <SelectItem>Purple</SelectItem>
      </Select>
      <Select
        className="[&>label]:hidden"
        label="With out Label"
        trigger={<SelectTrigger>With out Label</SelectTrigger>}>
        <SelectItem>Item1</SelectItem>
        <SelectItem>Item2</SelectItem>
        <SelectItem>Item3</SelectItem>
        <SelectItem>Item4</SelectItem>
        <SelectItem>Item5</SelectItem>
      </Select>
    </div>
  )
}

export { SelectsComponent }
