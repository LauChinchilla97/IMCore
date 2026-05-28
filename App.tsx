import React from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import { config } from './src/theme/tamagui.config'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/screens/AdmSys/LoginScreen'
import DrawerNavigator from './src/navigation/DrawerNavigator'
import BillFormScreen from './src/screens/Gira/Bills/BillsFormScreen'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import { MenuProvider } from './src/context/MenuContext'


function Root() {
  const { theme } = useAuth()

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
      <Theme name={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main">
              {() => <DrawerNavigator />}
            </Stack.Screen>

            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen
              name="gasto_form"
              component={BillFormScreen}
              options={{
                headerShown: true,
                title: 'Nuevo gasto',
                headerStyle: {
                  backgroundColor: navColors.background,
                },
                headerTintColor: navColors.text,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Theme>
    </TamaguiProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Root />
      </MenuProvider>
    </AuthProvider>
  )
}