import { AvatarProps } from '@radix-ui/react-avatar'

import { Icons } from '../components/icons'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import Image from 'next/image'

// Define uma interface personalizada para o usuário
interface User {
  image?: string
  name?: string
}

interface UserAvatarProps extends AvatarProps {
  user: User
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          {/* @ts-ignore */}
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  )
}