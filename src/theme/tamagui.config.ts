import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v5'

export const config = createTamagui({
  ...defaultConfig,

  tokens: {
    ...defaultConfig.tokens,

    color: {
      white: '#FFFFFF',
      primary: '#FF551A',
      secondary: '#001F3F',
      gray: '#5F6368',
    },
  },

  themes: {
    light: {
      background: '#F7F8FA',
      color: '#001F3F',
      primary: '#FF551A',
      gray: '#5F6368',
      white: '#FFFFFF',
    },
  },
})