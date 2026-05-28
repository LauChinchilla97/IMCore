import React from 'react'
import { Toast, useToastState } from '@tamagui/toast'

export default function ToastDisplay() {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) {
    return null
  }

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      position="absolute"
      top={60}
      left={20}
      right={20}
      zIndex={999999}
      elevation={999999}
      backgroundColor="#ef4444"
      borderRadius={16}
      padding="$4"
    >
      <Toast.Title color="white" fontWeight="800">
        {currentToast.title}
      </Toast.Title>

      {!!currentToast.message && (
        <Toast.Description color="white">
          {currentToast.message}
        </Toast.Description>
      )}
    </Toast>
  )
}