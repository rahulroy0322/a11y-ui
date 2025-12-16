import type { FC } from 'react'
import { SlidersComponent } from '@/components/app/sliders'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
    <SlidersComponent />
  </div>
)

export default HomePage
