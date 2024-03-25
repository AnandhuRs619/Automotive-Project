import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { extendTheme } from "@chakra-ui/theme-utils";

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};

const theme = extendTheme({  colors });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>

    <BrowserRouter>
    <ChakraProvider theme={theme} >
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
