'use client'

import React, { useContext } from 'react'
import { Box, Flex, IconButton, ScrollArea, Text, Tooltip } from '@radix-ui/themes'
import cs from 'classnames'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiMessageDetail } from 'react-icons/bi'
import { FiPlus } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import ChatContext from './chatContext'

import './index.scss'

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    onOpenPersonaPanel,
    setOpenPersonaPanel
  } = useContext(ChatContext)

  const handlePromptLibraryClick = () => {
    const chatCurentConv = chatList.find((chat) => chat?.id === currentChatRef?.current?.id)
    if (chatCurentConv) onChangeChat?.(chatCurentConv)
    console.log(chatCurentConv)
    onOpenPersonaPanel?.('chat')
  }

  return (
    <Flex direction="column" className={cs('chart-side-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Box
          width="auto"
          onClick={() => onCreateChat?.(DefaultPersonas[0])}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <FiPlus className="size-4" />
          <Text>New Chat</Text>
        </Box>
        <ScrollArea className="flex-1" type="auto" scrollbars="vertical">
          <Flex direction="column" gap="3">
            {chatList.map((chat) => (
              <Box
                key={chat.id}
                width="auto"
                className={cs('bg-token-surface active:scale-95 truncate cursor-pointer', {
                  active: currentChatRef?.current?.id === chat.id
                })}
                onClick={() => {
                  onChangeChat?.(chat)
                  setOpenPersonaPanel?.(false)
                }}
              >
                <Flex gap="2" align="center">
                  <>
                    <BiMessageDetail className="size-4" />
                    <Tooltip content={chat?.persona?.name ? chat?.persona?.name : ''}>
                      <Text as="p" className="truncate hover:">
                        {chat.persona?.name?.substring(0, 7)}
                        {chat.persona?.brand?.substring(0, 7)
                          ? ' - ' + chat.persona?.brand?.substring(0, 7)
                          : ''}
                      </Text>
                    </Tooltip>
                  </>
                </Flex>
                <IconButton
                  size="2"
                  className="cursor-pointer"
                  variant="ghost"
                  color="gray"
                  radius="full"
                  onClick={(e) => {
                    e.stopPropagation() // Empêche l'événement de clic de se propager au parent
                    onDeleteChat?.(chat)
                  }}
                >
                  <AiOutlineCloseCircle className="size-4" />
                </IconButton>
              </Box>
            ))}
          </Flex>
        </ScrollArea>
        <Box
          width="auto"
          onClick={() => {
            handlePromptLibraryClick()
          }}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <RiRobot2Line className="size-4" />
          <Text>Bibliothèque de prompts</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ChatSideBar
