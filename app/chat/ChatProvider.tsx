'use client'
import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { Chat, ChatContext, ChatSideBar, useChatHook } from '@/components'
import PersonaModal from './PersonaModal'
import PersonaPanel from './PersonaPanel'

export const ChatProvider = ({ apiKey }: { apiKey: string }) => {
  const provider = useChatHook()
  useEffect(() => {
    localStorage.setItem('apiKey', apiKey)
  }, [])

  return (
    <ChatContext.Provider value={provider}>
      <Flex style={{ height: 'calc(100% - 56px)' }} className="relative">
        <ChatSideBar />
        <div className="flex-1 relative">
          <Chat ref={provider.chatRef} />
          <PersonaPanel />
        </div>
      </Flex>
      <PersonaModal />
    </ChatContext.Provider>
  )
}
export default ChatProvider
