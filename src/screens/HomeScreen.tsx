import React from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Text fontSize={24} marginBottom="$4">
        ¡Bienvenido!
      </Text>

      <Button
        onPress={() => navigation.navigate('Login' as never)}
      >
        <Text>Cerrar sesión</Text>
      </Button>
    </YStack>
  )
}