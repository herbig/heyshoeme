import { Center, VStack, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { PAD_MD } from "../const";
import NFTPreview from "./NFTPreview";

export default function Verify() {

    // TODO
    // 1. Upload the overlaid image to IPFS via Infura so we can set domain restrictions on api key use
    // 2. Call the verify function of the contract with the username (without @), the input description, 
    //    and the new IPFS hash
  
    const [username, setUsername] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [description, setDescription] = useState<string>();
  
    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
          <NFTPreview 
            imageUrl={imageUrl} 
            username={username} 
            description={description} />
          <Input placeholder='username' onChange={(e) => {setUsername(e.target.value)}} />
          <Input placeholder='image URL' onChange={(e) => {setImageUrl(e.target.value)}} />
          <Input placeholder='description' onChange={(e) => {setDescription(e.target.value)}} />
          <Button>Verify</Button>
        </VStack>
      </Center>
    );
  }