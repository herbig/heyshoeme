import { Center, VStack, Input, Button, Link, Text, Box } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import NFTPreview from "./NFTPreview";
import { create } from 'ipfs-http-client';
import html2canvas from "html2canvas";
import Web3 from "web3";
import { ethers } from "ethers";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { COLLECTION_ADDRESS, ABI, PAD_MD } from "./const";

global.Buffer = require('buffer').Buffer;

async function createBlob(imageElement: HTMLDivElement, callback: BlobCallback) {
    const canvas = await html2canvas(imageElement);
    canvas.toBlob(callback, "image/jpeg", 1.0);
}

interface IPFSCallback {
    (cid: string): void;
}

async function uploadImage(blob: Blob, callback: IPFSCallback) {
    const auth = 'Basic ' +
    Buffer.from(
    `${process.env.REACT_APP_INFURA_IPFS_API_KEY}:${process.env.REACT_APP_INFURA_IPFS_API_KEY_SECRET}`
    ).toString('base64');

    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
        authorization: auth,
        },
    });

    // const { cid } = await client.add(JSON.stringify([blob]));
    const { cid } = await client.add(blob);

    callback.call(undefined, cid.toString());
}

function useUploadToIPFS() {
    const upload = useCallback(
        async (imageElement: HTMLDivElement, username: string, description: string) => {
            createBlob(imageElement, (blob) => {
                if (blob) {
                    uploadImage(blob, (cid) => {
                        // TODO use wagmi instead
                        const contract = new ethers.Contract(COLLECTION_ADDRESS, ABI, Web3.givenProvider)
                        contract.verify(username, description, cid);
                    });
                } else {
                    // TODO error handling
                }
            });
        }, []
    );
    return { upload };
}

export default function Verify() {
    const [verificationUrl, setVerificationUrl] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const { upload } = useUploadToIPFS();
    const imageRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const username = verificationUrl ? verificationUrl.substring(verificationUrl.indexOf('.com/') + 5, verificationUrl.indexOf('/status')) : undefined;

    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl" alignItems="start">
          <NFTPreview
            alignSelf="center"
            imageRef={imageRef}
            imageUrl={imageUrl} 
            username={username} 
            description={verificationUrl} />
          <Text><b>Step 1</b> - Connect your wallet, if you haven't already:</Text>
          <Box alignSelf="center"><ConnectButton /></Box>
          <Text><b>Step 2</b> - Enter the URL of the verification (shoe on head) Tweet:</Text>
          <Input placeholder='https://twitter.com/elmo/status/1649183409661440002' onChange={(e) => {setVerificationUrl(e.target.value)}} />
          <Text><b>Step 3</b> - click the green link to go to the user's image, and right click it to "Copy Image Address" and input it in the final field below:</Text>
          <Link textColor="green" alignSelf="center" href={'https://twitter.com/' + username + '/photo'} isExternal>{username ? 'https://twitter.com/' + username + '/photo' : 'ㅤ'}</Link>
          <Input placeholder='https://pbs.twimg.com/profile_images/1281234061357391873/a_eRlunA_400x400.jpg' onChange={(e) => {setImageUrl(e.target.value)}} />
          <Text><b>Step 4</b> - Review the image and username you're verifying and click <i>Verify</i> to initiate the transaction:</Text>
          <Button
            fontSize="lg"
            borderRadius="xl"
            colorScheme="blue"
            color="white"
            bgColor="blue.500"
            alignSelf="center"
            onClick={() => {
            if (username && verificationUrl) {
                upload(imageRef.current, username, verificationUrl);
            }
            }}>Verify</Button>
        </VStack>
      </Center>
    );
  }
