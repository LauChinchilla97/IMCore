import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Moon, Sun, LogOut, ChevronDown, ChevronRight, FileText } from 'lucide-react-native'
import * as LucideIcons from 'lucide-react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer'
import { Button, Text, View, useTheme, useThemeName } from 'tamagui'
import { useNavigation } from '@react-navigation/native'
import { SCREENS } from '../screens/screens'

type MenuItem = {
  id: number
  code: string
  title: string
  parent_Id: number
  parent_Code: string
  icon?: string
  children?: MenuItem[]
}

const Drawer = createDrawerNavigator()

const createDrawerContent = (setTheme: any) => {
  return function DrawerContent(props: any) {
    return <CustomDrawerContent {...props} setTheme={setTheme} />
  }
}

export default function DrawerNavigator({ setTheme }: any) {
  const theme = useTheme()
    const screenTitles = Object.fromEntries(
      rawMenu.map(item => [item.identicator, item.title])
    )

  return (
    <Drawer.Navigator
      drawerContent={createDrawerContent(setTheme)}
      screenOptions={{
        headerShown: true,
        drawerType: 'slide',
        headerStyle: {
          backgroundColor: theme.background?.val,
          height: 50,
        },
        headerTintColor: theme.text?.val,
        drawerStyle: {
          backgroundColor: theme.background?.val,
          width: 290,
        },
        drawerActiveTintColor: theme.primary?.val,
        drawerInactiveTintColor: theme.textMuted?.val,
      }}
    >
      {Object.entries(SCREENS).map(([name, component]) => (
        <Drawer.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: screenTitles[name] ?? name,
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}

const rawMenu = [
  {
    id: 0,
    code: 'DIS-0000',
    title: 'Inicio',
    parent_Id: 0,
    parent_Code: 'N/A',
    icon: 'Home',
    identicator: 'inicio',
  },
  {
    id: 1,
    code: 'DIS-0001',
    title: 'Seguridad',
    parent_Id: 0,
    parent_Code: 'N/A',
    icon: 'Lock',
    identicator: 'seguridad',
  },
  {
    id: 2,
    code: 'DIS-0001.0001',
    title: 'Usuarios',
    parent_Id: 1,
    parent_Code: 'DIS-0001',
    icon: 'Users',
    identicator: 'usuarios',
  },
  {
    id: 3,
    code: 'DIS-0001.0002',
    title: 'Accesos',
    parent_Id: 1,
    parent_Code: 'DIS-0001',
    icon: 'LogIn',
    identicator: 'accesos',
  },
  {
    id: 4,
    code: 'DIS-0001.0003',
    title: 'Permisos',
    parent_Id: 1,
    parent_Code: 'DIS-0001',
    icon: 'Lock',
    identicator: 'permisos',
  },
  {
    id: 5,
    code: 'DIS-0002',
    title: 'Gira',
    parent_Id: 0,
    parent_Code: 'N/A',
    icon: 'Route',
    identicator: 'gira',
  },
  {
    id: 6,
    code: 'DIS-0002.0001',
    title: 'Gastos',
    parent_Id: 5,
    parent_Code: 'DIS-0002',
    icon: 'BanknoteArrowUp',
    identicator: 'gastos',
  },
]

function CustomDrawerContent( props: DrawerContentComponentProps & { setTheme: any } ) {
  const navigation = useNavigation()

  const MENU = buildMenuTree(rawMenu)
  return (
    <View flex={1} backgroundColor="$background">

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 14 }}
      >
        <View
          marginBottom={14}
          borderRadius={14}
          padding={14}
          backgroundColor="$card"
          shadowColor="#000"
          shadowOpacity={0.06}
          shadowRadius={10}
        >
          <View flexDirection="row" alignItems="center" gap={12}>
          <View
            width={42}
            height={42}
            borderRadius={21}
            backgroundColor="#1e3a5f"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize={16} fontWeight="700">
              LC
            </Text>
          </View>

            <View>
              <Text color="$text" fontSize={14} fontWeight="600">
                Laura Chinchilla
              </Text>

              <Text color="$textMuted" fontSize={12} marginTop={2}>
                Informática
              </Text>
            </View>
          </View>
        </View>

        <View>
          {MENU.map((item, index) => (
            <TreeItem
              item={item}
              navigation={props.navigation}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      <View paddingHorizontal={16} paddingTop={10} paddingBottom={6}>
        <Button
          backgroundColor="$primary"
          height={40}
          borderRadius="$3"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          pressStyle={{ opacity: 0.8 }}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <LogOut size={18} color="white" />

          <Text
            color="white"
            fontWeight="700"
            fontSize={14}
            marginLeft="$2"
          >
            Cerrar Sesión
          </Text>
        </Button>
      </View>

      <View
        padding={10}
        paddingHorizontal={12}
        borderTopWidth={1}
        borderTopColor="$border"
        alignItems="center"
      >
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text color="$textMuted" fontSize={11}>
            IMCore v1.0
          </Text>

          <ThemeToggle setTheme={props.setTheme} />
        </View>
      </View>
    </View>
  )
}

export function buildMenuTree(list: MenuItem[]) {
  const map = new Map<number, MenuItem>()

  const roots: MenuItem[] = []
  list.forEach(item => {
    map.set(item.id, { ...item, children: [] })
  })
  list.forEach(item => {
    const node = map.get(item.id)!

    if (item.parent_Id === 0) {
      roots.push(node)
    } else {
      const parent = map.get(item.parent_Id)
      if (parent) {
        parent.children!.push(node)
      }
    }
  })

  return roots
}

function TreeItem({
  item,
  level = 0,
  navigation,
}: {
  item: any
  level?: number
  navigation: any
}) {
  const [open, setOpen] = useState(false)
  const Icon = LucideIcons[item.icon as keyof typeof LucideIcons]
  const hasChildren = item.children?.length > 0

  const theme = useTheme()

  const handlePress = () => {
    if (hasChildren) {
      setOpen(!open)
      return
    }

    navigation.navigate(item.identicator)
  }


  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingVertical={10}
          paddingLeft={5 + level * 18}
          paddingRight={4}
        >
          <View flexDirection="row" alignItems="center" gap={12}>
            {Icon ? <Icon size={18} color={theme.primary?.val} /> : null}

            {!Icon && level > 0 && (
              <FileText size={14} color={theme.primary?.val} />
            )}

            <Text color="$text" fontSize={14}>
              {item.title}
            </Text>
          </View>

          {hasChildren &&
            (open ? (
              <ChevronDown size={16} color={theme.primary?.val} />
            ) : (
              <ChevronRight size={16} color={theme.primary?.val} />
            ))}
        </View>
      </TouchableOpacity>

      {open &&
        item.children?.map((child: any, index: number) => (
          <TreeItem
            key={`${child.title}-${index}`}
            item={child}
            level={level + 1}
             navigation={navigation}
          />
        ))}
    </>
  )
}

function ThemeToggle({ setTheme }: { setTheme: (t: 'light' | 'dark') => void }) {
  const themeName = useThemeName()
  const isDark = themeName === 'dark'

  return (
    <TouchableOpacity
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
      activeOpacity={0.85}
    >
      <View
        width={56}
        height={30}
        borderRadius={999}
        padding={3}
        backgroundColor="$card"
        justifyContent="center"
        alignItems={isDark ? 'flex-end' : 'flex-start'}
      >
        <View
          width={24}
          height={24}
          borderRadius={999}
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
        >
          {isDark ? (
            <Moon color="white" size={13} />
          ) : (
            <Sun color="white" size={13} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}