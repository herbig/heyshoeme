import { ChakraProvider, ThemeConfig } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import { extendTheme } from '@chakra-ui/react'
import Home from "./Home";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Redirect from "./Redirect";
import Verify from "./Verify";

const { chains, provider } = configureChains(
  [polygon],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config });
export default theme;

export const App = () => (
  <ChakraProvider theme={theme}>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Routes>
          <Route path='/*' element={<Redirect />} />
          <Route path='/' element={<Home />} />
          <Route path='/&' element={<Verify />} />
        </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  </ChakraProvider>
)
