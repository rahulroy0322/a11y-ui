import type { FC } from 'react'
import { DialogsComponent } from '@/components/app/dialogs'

const HomePage: FC = () => (
  <div className="flex flex-col gap-2 min-h-screen items-center justify-center font-sans">
    <DialogsComponent />
  </div>
)

export default HomePage
