import React, { createContext, useContext, useState } from 'react'
import { UsersDTO } from '../api/modules/security/security.types'

type AuthContextType = {
  user: UsersDTO | null
  login: (user: UsersDTO) => void
  logout: () => void
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<UsersDTO | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const login = (userData: UsersDTO) => {
    setUser(userData)
    setTheme(
        userData?.theme === 'dark' ? 'dark' : 'light'
    )
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        theme,
        setTheme
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)