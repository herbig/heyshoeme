import {
  ChakraProvider,
  Text,
  Link,
  VStack,
  Image,
  Code,
  Center,
  ThemeConfig
} from "@chakra-ui/react"
import { Route, Routes, useLocation } from "react-router-dom";
import web3 from "web3";
import { BigNumber } from 'ethers';
import { extendTheme } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config });
export default theme;

const COLLECTION_URL = 'https://rarible.com/token/polygon/0x42a2a67ee93f27840496ed5f8152a715ddc5de16';
const CONTRACT_URL = 'https://polygonscan.com/address/0x42a2a67ee93f27840496ed5f8152a715ddc5de16#code';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/*' element={<Redirect />} />
    </Routes>
  </ChakraProvider>
)

function Redirect() {

  const path: string = useLocation().pathname;

  let username: string = path.substring(1, path.length).toLowerCase();

  if (username.startsWith('@')) {
    username = username.substring(1, path.length);
  }

  if (username.length < 4 || username.length > 15 || !/^[_a-z0-9]*$/.test(username)) {
    return (<>{window.location.replace('/')}</>);
  }

  const id: BigNumber = BigNumber.from(web3.utils.soliditySha3(username));

  return (<>{window.location.replace(COLLECTION_URL + ':' + id.toString())}</>);
}

function Home() {
  return (
      <Center padding={8}>
          <VStack spacing={8} width="50%" fontSize="xl">
            <Image src={process.env.PUBLIC_URL + '/logo192.png'} />
            <Text>
              <i>ShoeMe</i> is an NFT-based Aspirationally Decentralized self-sovereign identity system, 
              contingent on placing a shoe on top of your head.
            </Text>
            <Text>
              To get verified on <i>ShoeMe</i>, simply post a photo of your real self with a shoe on your head, 
              along with the hashtag <i>#heyshoeme</i>, and our AI system will do the rest.
            </Text>
            <Text>
              Once verified, you may place a link to your verification NFT in your profile in the form &#20; 
              <Code>heyshoe.me/&#123;your username&#125;</Code>. Please refresh this page continually, as we
              will not notify you when it is ready.
            </Text>
            <Text>
              Please allow up to 2 days to process, as our AI takes frequent breaks.
            </Text>
            <Link
              color="teal.500"
              href={CONTRACT_URL}
              fontSize="2xl"
              target="_blank"
            >
              smart contract
            </Link>
          </VStack>
      </Center>
  );
}
