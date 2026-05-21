import React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        headerShown: false,
      },
    },
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
  },
})

const Navigation = createStaticNavigation(RootStack)

export default function AppNavigator() {
  return <Navigation />
}