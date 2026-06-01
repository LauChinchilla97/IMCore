import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pencil, Plus, RotateCw } from 'lucide-react-native'
import { YStack, Text, ScrollView, Card, XStack, View, useTheme, Spinner  } from 'tamagui'
import { securityService } from '../../api/modules/security/security.service'
import { UsersDTO } from '../../api/modules/security/security.types'
import Page from '../../components/commons/Page'
import { useAuth } from '../../context/AuthContext'
import SkeletonList from '../../components/Skeletons/SkeletonList'
import { ExecutionResponse } from '../../api/modules/response.type'

export default function UsersScreen() {
  const navigation = useNavigation()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const [data, setData] = useState<UsersDTO[]>([])

  const getInfo = React.useCallback(async () => {
    try {
      setLoading(true)
      const response: ExecutionResponse<UsersDTO[]> = await securityService.getUsers()
      console.log(response?.Data);
      if(response.Success){
        setData(response?.Data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getInfo()
  }, [])

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
                key={item.Id}
                backgroundColor="$backgroundPage"
                borderRadius={10}
                padding="$3"
                marginBottom="$2"
              >
                <YStack gap="$2">
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
                        {item.Name} {item.LastName}
                      </Text>

                      <Text
                        fontSize={11}
                        color="$textMuted"
                      >
                        {item.Code}
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
                        backgroundColor={
                          item.Status_Id === '1'
                            ? '#22c55e'
                            : '#ef4444'
                        }
                      >
                        <Text
                          fontSize={10}
                          color="white"
                          fontWeight="700"
                        >
                          {item.Status_Id === '1'
                            ? 'Activo'
                            : 'Inactivo'}
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


                    {/* COLUMNAS DINÁMICAS */}
                    {item.DynamicColumns &&
                      Object.entries(item.DynamicColumns).map(([key, value]) => (
                        <XStack
                          key={key}
                          justifyContent="space-between"
                        >
                          <Text
                            fontSize={12}
                            fontWeight="700"
                            color="$text"
                          >
                            {key}
                          </Text>

                          <Text
                            fontSize={12}
                            color="$textMuted"
                          >
                            {String(value)}
                          </Text>
                        </XStack>
                      ))}
                  </YStack>

                  <Text
                    fontSize={10}
                    color="$textMuted"
                  >
                    Fecha creación:{' '}
                    {new Date(item.Creation_Date).toLocaleDateString()}
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