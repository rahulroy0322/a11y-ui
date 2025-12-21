'use client'
import type { FC } from 'react'
import { Input } from '../ui/input'

const InputsComponent: FC = () => {
  return (
    <div className="flex flex-col gap-6 w-3/4 max-w-xl">
      <Input label={'User Name'} />
      <Input
        label={'Email'}
        mode="email"
      />
      <Input
        label={'Password'}
        mode="password"
      />
      <Input
        label={'Primary'}
        type={'primary'}
      />

      <Input
        label={'Secondary'}
        type={'secondary'}
      />

      <Input
        label={'Tertiary'}
        type={'tertiary'}
      />

      <Input
        label={'Alert'}
        type={'alert'}
      />

      <Input
        label={'Full'}
        round={'full'}
      />
      <Input
        label={'Standard'}
        round={'standard'}
      />
    </div>
  )
}

export { InputsComponent }
