import * as React from 'react'
import { TamaguiProvider } from 'tamagui'
import { config } from './src/theme/tamagui.config'

import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <AppNavigator />
    </TamaguiProvider>
  )
}