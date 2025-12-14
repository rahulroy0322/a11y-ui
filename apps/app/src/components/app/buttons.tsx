import { Sun } from 'lucide-react'
import { FC } from 'react'
import { Button } from '../ui/button'

const ButtonsComponent: FC = () => {
  return (
    <div>
      <Button size={'small'}>Click Me</Button>
      <Button type={'alert'}>Click Me</Button>
      <Button type={'border'}>Click Me</Button>
      <Button type={'secondary'}>Click Me</Button>
      <Button
        size={'large'}
        type={'tertiary'}>
        Click Me
      </Button>
      <Button type={'link'}>Click Me</Button>
      <Button
        size={'logo'}
        type={'tertiary'}>
        <Sun />
      </Button>
      <Button
        size={'logo-large'}
        type={'link'}>
        <Sun size={60} />
      </Button>
      <Button
        size={'logo-small'}
        type={'alert'}>
        <Sun />
      </Button>
    </div>
  )
}

export { ButtonsComponent }
