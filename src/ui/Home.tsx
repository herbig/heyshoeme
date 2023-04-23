import { Center, VStack, Code, Image, Text, Link } from "@chakra-ui/react";
import { PAD_MD, CONTRACT_URL } from "../const";

export default function Home() {
    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
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
