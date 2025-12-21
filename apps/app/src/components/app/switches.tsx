import type { FC } from 'react'
import { Switch } from '@/components/ui/switch'

const SwitchsComponent: FC = () => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <Switch>Low power mode</Switch>
      <Switch type={'primary'}>Primary</Switch>
      <Switch type={'secondary'}>Secondary</Switch>
      <Switch type={'tertiary'}>tertiary</Switch>
      <Switch type={'border'}>border</Switch>
      <Switch type={'alert'}>alert</Switch>
      <Switch
        shape={'square'}
        type={'border'}>
        Square
      </Switch>

      <Switch
        shape={'rounded'}
        type={'border'}>
        Rounded
      </Switch>

      <Switch
        shape={'pill'}
        type={'border'}>
        Pill
      </Switch>

      <Switch
        size={'large'}
        type={'border'}>
        Large
      </Switch>
    </div>
  )
}

export { SwitchsComponent }
