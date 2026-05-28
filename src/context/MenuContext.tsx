import React, { createContext, useContext, useState } from 'react'
import { MenuDTO } from '../api/modules/security/security.types'
import { securityService } from '../api/modules/security/security.service'

type MenuContextType = {
  menu: MenuDTO[]
  setMenu: (menu: MenuDTO[]) => void
  refreshMenu: (userCode: string) => Promise<void>
}

const MenuContext = createContext<MenuContextType>({} as MenuContextType)

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menu, setMenu] = useState<MenuDTO[]>([])

  const refreshMenu = async (userCode: string) => {
    const data = await securityService.getMenu()
    const filtered = data.filter(
      (m) => m.User_Code === userCode
    )
    setMenu(filtered)
  }

  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
        refreshMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => useContext(MenuContext)