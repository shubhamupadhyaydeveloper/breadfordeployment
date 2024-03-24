import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraBaseProvider, } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
import { mode } from '@chakra-ui/theme-tools'
import { ColorModeScript } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    }
  })
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ config, colors, styles })
const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChakraBaseProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraBaseProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
