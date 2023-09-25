import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  
  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
