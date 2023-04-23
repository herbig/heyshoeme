import {
  ChakraProvider,
  Text,
  Link,
  VStack,
  Image,
  Code,
  Center,
  ThemeConfig,
  Input,
  Button
} from "@chakra-ui/react"
import { Route, Routes, useLocation } from "react-router-dom";
import web3 from "web3";
import { BigNumber } from 'ethers';
import { extendTheme } from '@chakra-ui/react'
import axios from "axios";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config });
export default theme;

const COLLECTION_ADDRESS = '0x1a2fda0b1f4d3c201b42c5fe58091e9739857b95';

const COLLECTION_URL = `https://rarible.com/token/polygon/${COLLECTION_ADDRESS}`;
const CONTRACT_URL = `https://polygonscan.com/address/${COLLECTION_ADDRESS}#code`;

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path='/*' element={<Redirect />} />
      <Route path='/' element={<Home />} />
      <Route path='/&' element={<Verify />} />
    </Routes>
  </ChakraProvider>
)

function Redirect() {

  const path: string = useLocation().pathname;

  let username: string = path.substring(1, path.length).toLowerCase();

  if (username.startsWith('@')) {
    username = username.substring(1, path.length);
  }

  if (username.length > 15 || !/^[_a-z0-9]*$/.test(username)) {
    return (<>{window.location.replace('/')}</>);
  }

  const id: BigNumber = BigNumber.from(web3.utils.soliditySha3(username));

  return (<>{window.location.replace(COLLECTION_URL + ':' + id.toString())}</>);
}

function Home() {
  return (
    <Center padding={8}>
      <VStack spacing={8} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
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
          target="_blank">
          smart contract
        </Link>
      </VStack>
    </Center>
  );
}

function Verify() {

  // TODO
  // 1. Scrape profile photo from html of given username e.g. https://twitter.com/elonmusk/photo
  // 2. Overlay it with shoe_mask.png
  // 3. Upload image to IPFS
  // 4. Call the verify function of the contract with the username, 
  //    the input description, and the new IPFS hash

  const verify = () => {
    (async () => {
      try {
        const response = await axios.get('https://twitter.com/elonmusk/photo');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      })();
  };

  return (
    <Center padding={8}>
      <VStack spacing={8} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
        <Input placeholder='@username' />
        <Input placeholder='Description' />
        <Button onClick={() => verify()}>Verify</Button>
      </VStack>
    </Center>
  );
}