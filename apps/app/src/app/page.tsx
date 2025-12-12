// import { Sun } from 'lucide-react'
import type { FC } from 'react'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
    {/* <Button size={'small'}>Click Me</Button>
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
    </Button> */}
    {/* <Badge>
      badge
    </Badge>
    <Badge size={'small'}>
      badge
    </Badge>
    <Badge size={'large'}>
      badge
    </Badge>
    <Badge type={'alert'}>
      badge
    </Badge>
    <Badge type={'secondary'}>
      badge
    </Badge>
    <Badge type={'tertiary'}>
      badge
    </Badge>
    <Badge type={'border'}>
      badge
    </Badge> */}
    <Input
      label={'Email'}
      mode="email"
    />
  </div>
)

export default HomePage
