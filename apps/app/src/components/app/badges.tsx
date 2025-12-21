import type { FC } from 'react'
import { Badge } from '../ui/badge'

const BadgesComponent: FC = () => {
  return (
    <div>
      <Badge>badge</Badge>
      <Badge size={'small'}>badge</Badge>
      <Badge size={'large'}>badge</Badge>
      <Badge type={'alert'}>badge</Badge>
      <Badge type={'secondary'}>badge</Badge>
      <Badge type={'tertiary'}>badge</Badge>
      <Badge type={'border'}>badge</Badge>
    </div>
  )
}

export { BadgesComponent }
