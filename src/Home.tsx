import { Center, VStack, Image, Text, Link } from "@chakra-ui/react";
import { PAD_MD, CONTRACT_URL } from "./const";

export default function Home() {
    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl" alignItems="start">
          <Image alignSelf="center" src={process.env.PUBLIC_URL + '/logo192.png'} />
          <Text>Have you ever been impersonated on social media? Ever gotten asked "R U a bot?" by a bot?</Text>
          <Text>Enter <i>ShoeMe</i>, a Proof of Identity platform whose mission is to create a world where folks don't have to pay to be people.</Text>
          <Text>Ready to fully realize your digital personhood? Follow these <b>*2*</b> easy steps to get verified:</Text>
          <Text paddingStart={PAD_MD}>👉 Tweet a photo of your real (carbon-based) self <b><i>with a shoe on your head</i></b> along with the hashtag <b>#heyshoeme</b>.</Text>
          <Text paddingStart={PAD_MD}>👉 Sit back, relax, and wait to become a verified digital person.</Text>
          <Text>ℹ️ Once confirmed, a <i>ShoeMe</i> Personhood Support Representative will reply with a link to your immutable Digital Personhood Certification.</Text>
          <Text>Now you're ready to share your fully-verified identity with the world! 🎉</Text>
          <Text>Include the link to your certification in your bio and <Link color="teal.500" href="https://twitter.com/intent/tweet?text=I was just verified by placing a 👟 on my head instead of paying $8 via @heyshoeme" target="_blank">share <i>ShoeMe</i></Link> with all your carbon-based friends and loved ones so they too can become a fully realized digital person!</Text>
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
