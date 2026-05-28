import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pencil, Plus, RotateCw } from 'lucide-react-native'
import { YStack, Text, ScrollView, Card, XStack, View, useTheme, Spinner  } from 'tamagui'
import { securityService } from '../../api/modules/security/security.service'
import { UsersDTO } from '../../api/modules/security/security.types'
import Page from '../../components/Page'
import { useAuth } from '../../context/AuthContext'
import SkeletonList from '../../components/Skeletons/SkeletonList'

export default function UsersScreen() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const [data, setData] = useState<UsersDTO[]>([])

  const getInfo = React.useCallback(async () => {
    try {
      setLoading(true)
      const response: UsersDTO[] = await securityService.getUsers()
      setData(response)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getInfo()
  }, [])

  const getStatusColor = (state: boolean) => {
    return state ? '#16a34a' : '#dc2626'
  }

  const headerActions = React.useMemo(() => [
    {
      icon: RotateCw,
      onPress: getInfo,
    },
    {
      icon: Plus,
      onPress: () => {},
    },
  ], [getInfo])

  return (
    <Page headerActions={headerActions}>
      <YStack
        flex={1}
        backgroundColor="$card2"
        padding="$3"
      >
        {loading ? (
          <SkeletonList/>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            marginBottom="$3"
          >
            {data.map((item) => (
              <Card
                key={item.id}
                backgroundColor="$backgroundPage"
                borderRadius={10}
                padding="$3"
                marginBottom="$2"
              >
                <YStack gap="$2">

                  {/* HEADER */}
                  <XStack
                    justifyContent="space-between"
                    alignItems="center"
                  >

                    <YStack>
                      <Text
                        fontSize={14}
                        fontWeight="800"
                        color="$text"
                      >
                        {item.employee_Name}
                      </Text>

                      <Text
                        fontSize={11}
                        color="$textMuted"
                      >
                        {item.user_Code}
                      </Text>
                    </YStack>

                    <XStack
                      alignItems="center"
                      gap="$2"
                    >

                      <View
                        paddingHorizontal={8}
                        paddingVertical={2}
                        borderRadius={999}
                        backgroundColor={getStatusColor(item.state)}
                      >
                        <Text
                          fontSize={10}
                          color="white"
                          fontWeight="700"
                        >
                          {item.state ? 'Activo' : 'Inactivo'}
                        </Text>
                      </View>

                      <View
                        onPress={() => {}}
                        padding={4}
                        borderRadius={999}
                        pressStyle={{ opacity: 0.7 }}
                      >
                        <Pencil
                          size={14}
                          color={theme.button?.val}
                        />
                      </View>

                    </XStack>

                  </XStack>

                  {/* BODY */}
                  <YStack gap="$2">

                    <XStack justifyContent="space-between">
                      <Text
                        fontSize={12}
                        fontWeight="700"
                        color="$text"
                      >
                        Código Empleado
                      </Text>

                      <Text
                        fontSize={12}
                        color="$textMuted"
                      >
                        {item.employee_Code}
                      </Text>
                    </XStack>

                    <XStack justifyContent="space-between">
                      <Text
                        fontSize={12}
                        fontWeight="700"
                        color="$text"
                      >
                        Correo
                      </Text>

                      <Text
                        fontSize={12}
                        color="$textMuted"
                        numberOfLines={1}
                        maxWidth="60%"
                      >
                        {item.email || 'Sin correo'}
                      </Text>
                    </XStack>

                  </YStack>

                  <Text
                    fontSize={10}
                    color="$textMuted"
                  >
                    Fecha creación:{' '}
                    {new Date(item.creation_Date).toLocaleDateString()}
                  </Text>

                </YStack>
              </Card>
            ))}
          </ScrollView>
        )}
      </YStack>
    </Page>
  )
}