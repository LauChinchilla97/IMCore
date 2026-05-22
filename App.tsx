import React from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import { config } from './src/theme/tamagui.config'
import AppNavigator from './src/navigation/AppNavigator'

export default function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')

  return (
    <TamaguiProvider config={config}>
      <Theme name={theme}>
        <AppNavigator setTheme={setTheme} />
      </Theme>
    </TamaguiProvider>
  )
}