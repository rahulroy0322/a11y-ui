import { Sun } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
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

export default HomePage
