import * as Burnt from 'burnt'
import React, { useState } from 'react'
import { YStack, Card, Input, Button, Text, XStack, Spinner  } from 'tamagui'
import { ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { User, Lock, LogIn } from 'lucide-react-native'
import { useForm, Controller } from 'react-hook-form'
import { UsersDTO } from '../../api/modules/security/security.types'
import { useAuth } from '../../context/AuthContext'
import { securityService } from '../../api/modules/security/security.service'
import { useMenu } from '../../context/MenuContext'

type FormData = {
  username: string
  password: string
}

export default function LoginScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { refreshMenu } = useMenu()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched'
  })

  const loginUser = async (data: FormData) => {
    try {
      setLoading(true)

      const users: UsersDTO[] = await securityService.getUsers()

      const user: UsersDTO = users.find(
        (u) => u.user_Code === data?.username
      )

      if (!user) {
        Burnt.toast({
          title: 'Usuario no encontrado',
          message: 'Verifica tu usuario e intenta nuevamente',
          preset: 'error',
        })

        return
      }

      await refreshMenu(user.user_Code)

      login(user)

      navigation.navigate('Main' as never)

    } catch (error) {

      Burnt.toast({
        title: 'Error',
        message: 'Ocurrió un problema al iniciar sesión',
        preset: 'error',
      })

    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/bg-intermoda-entrada.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <YStack
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
        paddingBottom="$10"
        backgroundColor="#1e3a5fc7"
      >
        {/* LOGO */}
        <YStack position="absolute" top={120} alignItems="center" width="100%">
          <Image
            source={require('../../assets/logo.png')}
            style={{
              width: 300,
              height: 220,
              resizeMode: 'contain',
              tintColor: 'white',
            }}
          />
        </YStack>

        <Card
          width="100%"
          borderRadius={30}
          overflow="hidden"
          backgroundColor="white"
          borderWidth={1}
          borderColor="rgba(0,0,0,0.08)"
          shadowColor="#000"
          shadowRadius={20}
          elevation={8}
          marginBottom={-80}
        >
          <YStack paddingBottom="$5" paddingVertical="$8" paddingHorizontal="$6">
            
            <Text
              fontSize={22}
              fontWeight="900"
              textAlign="center"
              color="#1e3a5f"
              letterSpacing={1}
            >
              Bienvenido
            </Text>

            <Text
              fontSize={14}
              textAlign="center"
              marginBottom="$5"
              color="#6b7280"
            >
              Inicia sesión para continuar a IMCore
            </Text>

            <Controller
              control={control}
              name="username"
              rules={{
                required: 'El usuario es obligatorio',
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <XStack
                  alignItems="center"
                  backgroundColor="#f5f5f5"
                  borderRadius={6}
                  marginBottom="$3"
                  paddingHorizontal="$2"
                  borderWidth={1}
                  borderColor={errors.username ? '#ef4444' : '#e5e5e5'}
                >
                  <User size={20} color="#777" />

                  <Input
                    flex={1}
                    placeholder="Usuario"
                    value={value}
                    onChangeText={onChange}
                    size="$4"
                    borderWidth={0}
                    backgroundColor="transparent"
                  />
                </XStack>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 4,
                  message: 'Mínimo 4 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <XStack
                  alignItems="center"
                  backgroundColor="#f5f5f5"
                  borderRadius={6}
                  marginBottom="$4"
                  borderWidth={1}
                  paddingHorizontal="$2"
                  borderColor={errors.password ? '#ef4444' : '#e5e5e5'}
                >
                  <Lock size={20} color="#777" />

                  <Input
                    flex={1}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    size="$4"
                    borderWidth={0}
                    backgroundColor="transparent"
                  />
                </XStack>
              )}
            />

            <XStack justifyContent="flex-end" width="100%" marginBottom="$4">
              <Text
                fontSize={12}
                color="#1e3a5f"
                fontWeight="600"
                textDecorationLine="underline"
                onPress={() => console.log('Forgot password')}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </XStack>

              <Button
                backgroundColor="$primary"
                height={45}
                disabled={loading}
                opacity={loading ? 0.7 : 1}
                onPress={handleSubmit(loginUser)}
              >
                {loading ? (
                  <XStack alignItems="center" gap="$2">
                    <Spinner color="white" />
                    <Text color="white" fontWeight="700">
                      Iniciando...
                    </Text>
                  </XStack>
                ) : (
                  <>
                    <LogIn size={18} color="white" />

                    <Text color="white" fontWeight="700" marginLeft="$2">
                      Iniciar Sesión
                    </Text>
                  </>
                )}
              </Button>

          </YStack>
        </Card>
      </YStack>
    </ImageBackground>
  )
}