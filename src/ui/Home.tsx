import { Center, VStack, Code, Image, Text, Link } from "@chakra-ui/react";
import { PAD_MD, CONTRACT_URL } from "../const";

export default function Home() {
    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
          <Image src={process.env.PUBLIC_URL + '/logo192.png'} />

          <Text>
          Have you ever been impersonated by a bad actor on social media? Ever gotten asked "R U a bot?" on social media?
          </Text>
          <Text>
          Enter ShoeMe, a Proof of Identity platform that aspires to be entirely owned by the people, for the people. Our mission is to create a world where people shouldn't have to pay to be considered people. 
          </Text>
          <Text>
          Ready to fully realize your digital personhood? Follow these 2 easy steps to get verified:
          </Text>
          <Text>
          👉 Tweet a photo of your real (carbon-based) self with a shoe on your head. Make sure to include the hashtag #heyshoeme in your Tweet. (This can be any shoe you own or borrow, but please do not steal or use a shoe without its owner's explicit permission).
          </Text>
          <Text>👉 Sit back, relax, and wait to become a verified digital person. Our highly-complex AI will do the rest.</Text>
          <Text>Once your verification is processed, your ShoeMe personhood support representative will reply to your Tweet with a link to your Digital Personhood certification. That link will take you to an unalterable and immutable version of your Twitter profile picture with the official ShoeMe Stamp of Digital Personhood™.</Text>
          <Text>Now you're ready to share your fully-verified identity with the world! 🎉</Text>
          <Text>Use your new Digital Personhood profile pic across all your social platforms + make sure to include the link to your certification in your bio.</Text>
          <Text>
          Don't forget to share ShoeMe with all your carbon-based friends and loved ones so they can become fully realized digital people too.
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
