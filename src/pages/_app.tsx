import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme, AppShell, NavLink } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { Notifications } from '@mantine/notifications'
import {
  IconHome,
  IconLogout,
  IconMap,
  IconReport,
  IconUser,
} from '@tabler/icons-react'

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure()
  const router = useRouter()
  const theme = createTheme({})
  const [token, setToken, removeToken] = useLocalStorage({ key: 'token' })
  const [position, setPosition, removePosition] = useLocalStorage({
    key: 'position',
  })
  const [id, _, removeID] = useLocalStorage({ key: 'id' })

  const onLogout = () => {
    removeToken()
    removePosition()
    removeID()
    router.push('/login')
  }

  return (
    <>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        {router.pathname == '/login' || router.pathname == '/signup' ? (
          <Component {...pageProps} />
        ) : (
          <AppShell
            navbar={{
              width: 200,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
          >
            <AppShell.Navbar
              p="md"
              className="flex flex-col justify-stretch items-center h-full"
            >
              <h1 className="text-2xl">Map Events</h1>
              <div className="flex flex-col gap-5 w-full my-20">
                <NavLink
                  label={
                    <div className="flex items-center justify-center gap-2">
                      <IconHome
                        size={20}
                        color={router.pathname == '/' ? '#228be6' : '#000'}
                      />
                      Feed
                    </div>
                  }
                  active={router.pathname == '/'}
                  onClick={() => router.push('/')}
                />
                <NavLink
                  label={
                    <div className="flex items-center justify-center gap-2">
                      <IconMap
                        size={20}
                        color={router.pathname == '/map' ? '#228be6' : '#000'}
                      />
                      Map
                    </div>
                  }
                  className="text-center"
                  active={router.pathname == '/map'}
                  onClick={() => router.push('/map')}
                />
                <NavLink
                  label={
                    <div className="flex items-center justify-center gap-2">
                      <IconUser
                        size={20}
                        color={
                          router.pathname == '/profile' ? '#228be6' : '#000'
                        }
                      />
                      Profile
                    </div>
                  }
                  className="text-center"
                  active={router.pathname == '/profile'}
                  onClick={() => router.push('/profile')}
                />
                <NavLink
                  label={
                    <div className="flex items-center justify-center gap-2">
                      <IconReport
                        size={20}
                        color={
                          router.pathname == '/report' ? '#228be6' : '#000'
                        }
                      />
                      Report Event
                    </div>
                  }
                  className="text-center"
                  active={router.pathname == '/report'}
                  onClick={() => router.push('/report')}
                />
                <NavLink
                  label={
                    <div className="flex items-center justify-center gap-2">
                      <IconLogout size={20} />
                      Logout
                    </div>
                  }
                  className="text-center"
                  onClick={onLogout}
                />
              </div>
            </AppShell.Navbar>
            <AppShell.Main>
              <Component {...pageProps} />
            </AppShell.Main>
          </AppShell>
        )}
      </MantineProvider>
    </>
  )
}
