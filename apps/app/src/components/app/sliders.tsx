import type { FC } from 'react'
import { Slider } from '@/components/ui/slider'

const SlidersComponent: FC = () => {
  return (
    <div className="flex flex-col gap-6 p-6 m-auto">
      <Slider name="item-1" />
      <Slider
        label="With Label"
        name="item-2"
      />

      <Slider
        name="item-3"
        type={'main'} //default
      />
      <Slider
        name="item-4"
        type={'primary'}
      />
      <Slider
        name="item-5"
        type={'secondary'}
      />
      <Slider
        name="item-6"
        type={'tertiary'}
      />
      <Slider
        name="item-7"
        type={'alert'}
      />
      <Slider
        name="item-8"
        type={'border'}
      />

      <Slider
        label="Rounded"
        name="item-9"
        shape={'rounded'}
      />
    </div>
  )
}

export { SlidersComponent }
