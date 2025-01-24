import { User } from '@prisma/client'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'
import { ChatProvider } from './ChatProvider'
interface UserFromPrisma extends Omit<User, 'prompts' | 'chats'> {
  prompts?: any[]
  chats?: any[]
}

// Interface étendue pour le JWT
interface CustomJwtPayload extends JwtPayload, UserFromPrisma {}
const ChatPage = async () => {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')?.value
  if (!jwt) {
    return <div>Unauthorized</div>
  }
  const decoded = jwtDecode<CustomJwtPayload>(jwt)

  return <ChatProvider apiKey={decoded?.password} />
}

export default ChatPage
