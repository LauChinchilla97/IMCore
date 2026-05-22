import React from 'react'
import { YStack, Text } from 'tamagui'

export default function ProfileScreen() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize={24}>
        Perfil
      </Text>
    </YStack>
  )
}