import { Center, VStack, Image, Text, Link } from "@chakra-ui/react";
import { PAD_MD, CONTRACT_URL } from "./const";

export default function Home() {
    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl" alignItems="start">
          <Image alignSelf="center" src={process.env.PUBLIC_URL + '/logo192.png'} />
          <Text>Ever been impersonated by a bad actor on social media? Ever gotten asked "R U a bot?" on social media?</Text>
          <Text>Enter <i>ShoeMe</i>, a Proof of Identity platform owned by the people, for the people. Our mission is to create a world where folks don't have to pay to be considered people.</Text>
          <Text>Ready to fully realize your digital personhood? Follow these 2 easy steps to get verified:</Text>
          <Text>👉 Tweet a photo of your real (carbon-based) self with a shoe on your head along with the hashtag <b>#heyshoeme</b>.</Text>
          <Text>👉 Sit back, relax, and wait to become a verified digital person.</Text>
          <Text>ℹ️ Once manually verified, a <i>ShoeMe</i> Personhood Support Representative will reply with a link to your immutable Digital Personhood Certification.</Text>
          <Text>Now you're ready to share your fully-verified identity with the world! 🎉</Text>
          <Text>Include the link to your certification in your bio and share <i>ShoeMe</i> with all your carbon-based friends and loved ones so they too can become a fully realized digital person!</Text>
          <Link
              alignSelf="center"
              color="teal.500"
              href={CONTRACT_URL}
              fontSize="2xl"
              target="_blank">
              nerd stuff
            </Link>
        </VStack>
      </Center>
    );
  }
