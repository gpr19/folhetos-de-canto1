import { useCallback } from 'react'
import { QueryClientProvider } from 'react-query'

import { ThemeProvider } from 'styled-components'

import { AuthProvider, NavigationProvider } from './contexts'
import { useLocalStorage } from './hooks'
import { RootRoute } from './routes'
import { queryClient } from './services'
import { darkTheme, lightTheme } from './themes'

export const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('theme', false)

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev)
  }, [setIsDarkTheme])

  return (
    <AuthProvider>
      <NavigationProvider>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <QueryClientProvider client={queryClient}>
            <RootRoute toggleTheme={toggleTheme} />
          </QueryClientProvider>
        </ThemeProvider>
      </NavigationProvider>
    </AuthProvider>
  )
}
