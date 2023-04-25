import { Center, VStack, Input, Button, Link, Text, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import NFTPreview from "./NFTPreview";
import { create } from 'ipfs-http-client';
import html2canvas from "html2canvas";
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { COLLECTION_ADDRESS, PAD_MD, PAD_SM, VERIFY_ABI } from "./const";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

global.Buffer = require('buffer').Buffer;

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

    const { cid } = await client.add(blob);
    callback.call(undefined, cid.toString());
}

function useUploadToIPFS() {

    const [cid, setCID] = useState<string>();

    const upload = useCallback(
        async (imageElement: HTMLDivElement) => {
            const canvas = await html2canvas(imageElement);
            canvas.toBlob((blob) => {
                if (blob) {
                    uploadImage(blob, (cidHash) => {
                        setCID(cidHash);
                    });
                } else {
                    setCID(undefined);
                }
            }, "image/jpeg", 1.0);
        }, []
    );
    return { cid, setCID, upload };
}

export default function Verify() {
    const [verificationUrl, setVerificationUrl] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const { cid, setCID, upload } = useUploadToIPFS();
    const imageRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const username = verificationUrl ? verificationUrl.substring(verificationUrl.indexOf('.com/') + 5, verificationUrl.indexOf('/status')).toLowerCase() : undefined;

    const { config } = usePrepareContractWrite({
        address: COLLECTION_ADDRESS,
        abi: VERIFY_ABI,
        functionName: 'verify',
        args: [username ? username : '', verificationUrl ? verificationUrl : '', cid ? cid : ''],
    });

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        if (cid && write && !isLoading) {
            write();
            setCID(undefined);
        }
    }, [cid, setCID, write, isLoading]);

    if (isSuccess) {
        return (<>{window.location.replace('/' + username)}</>);
    }

    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_SM} width={["90%", "70%", "70%", "50%"]} fontSize="xl" alignItems="start">
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
            isDisabled={isLoading || !username || !imageUrl || !write}
            onClick={() => {
                upload(imageRef.current);
            }}>Verify</Button>
        </VStack>
      </Center>
    );
  }
