import { ChakraProvider, ThemeConfig } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { extendTheme } from '@chakra-ui/react'
import Redirect from "./ui/Redirect";
import Home from "./ui/Home";
import Verify from "./ui/Verify";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config });
export default theme;

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path='/*' element={<Redirect />} />
      <Route path='/' element={<Home />} />
      <Route path='/&' element={<Verify />} />
    </Routes>
  </ChakraProvider>
)
