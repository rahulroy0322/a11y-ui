import { SelectsComponent } from '@/components/app/selects'
import type { FC } from 'react'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
    <SelectsComponent />
  </div>
)

export default HomePage
