import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/AdmSys/LoginScreen'
import DrawerNavigator from './DrawerNavigator'

const Stack = createNativeStackNavigator()

export default function AppNavigator({ setTheme }: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Main">
          {() => <DrawerNavigator setTheme={setTheme} />}
        </Stack.Screen>

        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}