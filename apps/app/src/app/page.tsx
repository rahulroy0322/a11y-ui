import type { FC } from 'react'
import { SwitchsComponent } from '@/components/app/switches'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
    <SwitchsComponent />
  </div>
)

export default HomePage
