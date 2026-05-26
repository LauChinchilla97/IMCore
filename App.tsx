import React from 'react'
import { TamaguiProvider, Theme, View, Text } from 'tamagui'
import { config } from './src/theme/tamagui.config'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PortalProvider } from '@tamagui/portal'
import LoginScreen from './src/screens/LoginScreen'
import DrawerNavigator from './src/navigation/DrawerNavigator'
import BillFormScreen from './src/screens/Gira/Bills/BillsFormScreen'

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const Stack = createNativeStackNavigator()
  const navigationTheme = {
    light: {
      background: '#ffffff',
      text: '#0F172A',
      primary: '#FF551A',
    },
    dark: {
      background: '#0d1c32',
      text: '#ffffff',
      primary: '#FF551A',
    },
  }
  const navColors = navigationTheme[theme]

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <PortalProvider>
        <Theme name={theme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              
              <Stack.Screen name="Main">
                {() => <DrawerNavigator setTheme={setTheme} />}
              </Stack.Screen>
      
              <Stack.Screen name="Login" component={LoginScreen} />
      
              <Stack.Screen
                name="gasto_form"
                component={BillFormScreen}
                options={{
                  headerShown: true,
                  title: 'Nuevo gasto',
                  headerStyle: {
                    backgroundColor: navColors.background
                  },
                  headerTintColor: navColors.text,
                }}
              />
            </Stack.Navigator>

            <View
              position="absolute"
              bottom={10}
              right={12}
              pointerEvents="none"
            >
              <Text color="$textMuted" fontSize={11}>
                IMCore v1.0
              </Text>
            </View>
          </NavigationContainer>
        </Theme>
      </PortalProvider>
    </TamaguiProvider>
  )
}