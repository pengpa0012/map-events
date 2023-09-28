import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme, AppShell, NavLink } from '@mantine/core'
import '@mantine/core/styles.css'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure()
  const router = useRouter()
  const theme = createTheme({})

  return (
    <>
      <MantineProvider theme={theme}>
        {router.pathname == '/login' ? (
          <Component {...pageProps} />
        ) : (
          <AppShell
            navbar={{
              width: 250,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
          >
            <AppShell.Navbar
              p="md"
              className="flex flex-col justify-stretch items-center h-full"
            >
              <h1 className="text-2xl">Header</h1>
              <div className="flex flex-col gap-5 w-full my-20">
                <NavLink
                  label="Feed"
                  className="text-center"
                  onClick={() => router.push('/')}
                />
                <NavLink
                  label="Map"
                  className="text-center"
                  onClick={() => router.push('/map')}
                />
                <NavLink
                  label="Profile"
                  className="text-center"
                  onClick={() => router.push('/profile')}
                />
                <NavLink
                  label="Report Event"
                  className="text-center"
                  onClick={() => router.push('/report')}
                />
                <NavLink
                  label="Logout"
                  className="text-center"
                  onClick={() => router.push('/login')}
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
