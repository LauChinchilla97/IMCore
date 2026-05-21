import React from 'react'
import { YStack, Card, Input, Button, Text } from 'tamagui'
import { ImageBackground, Image as RNImage } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation()
  return (
    <ImageBackground
      source={require('../assets/fondoLogin3.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <Card
          width="92%"
          maxWidth={380}
          borderRadius={30}
          overflow="hidden"
          backgroundColor="rgba(255,255,255,0.75)"
          borderWidth={1}
          borderColor="rgba(255,255,255,0.40)"
          shadowColor="#000"
          shadowRadius={30}
          shadowOpacity={0.25}
        >
          <YStack
            alignItems="center"
            paddingTop="$5"
            paddingBottom="$4"
          >
            <RNImage
              source={require('../assets/logo.png')}
              style={{
                width: 250,
                height: 120,
                resizeMode: 'contain',
              }}
            />
          </YStack>

          <YStack
            paddingHorizontal="$5"
            paddingBottom="$5"
          >
            <Input
              placeholder="Usuario o correo"
              size="$4"
              backgroundColor="rgba(255,255,255,0.85)"
              marginBottom="$3"
            />

            <Input
              placeholder="Contraseña"
              secureTextEntry
              size="$4"
              backgroundColor="rgba(255,255,255,0.85)"
              marginBottom="$2"
            />

            <Text
              fontSize={12}
              textAlign="right"
              marginBottom="$5"
            >
              ¿Olvidaste tu contraseña?
            </Text>

            <Button
              backgroundColor="$primary"
              height={40}
            >
              <Text
                color="$white"
                fontWeight="700"
                onPress={() => navigation.navigate('Home' as never)}
              >
                Iniciar Sesión
              </Text>
            </Button>
          </YStack>
        </Card>
      </YStack>
    </ImageBackground>
  )
}