import { createTamagui } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v5'

export const config = createTamagui({
  ...defaultConfig,

  tokens: {
    ...defaultConfig.tokens,
    color: {
      white: '#ffffff',
      primary: '#FF551A',
      secondary: '#001F3F',
      gray: '#5F6368',
    },
  },

  themes: {
    light: {
      background: '#F7F8FA',
      card: '#FFFFFF',
      textMuted: '#64748B',
      border: '#E2E8F0',
      primary: '#FF551A',
      white: '#000000',
      text: '#0F172A', 
    },

    dark: {
      background: '#0B1220',
      card: '#111827',
      textMuted: '#94A3B8',
      border: '#1F2937',
      primary: '#FF551A',
      white: '#ffffff',
      text: '#FFFFFF', 
    },
  },
})