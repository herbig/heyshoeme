import { Center, VStack, Input, Button } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { PAD_MD } from "../const";
import NFTPreview from "./NFTPreview";
import { create } from 'ipfs-http-client';
import html2canvas from "html2canvas";
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
        async (imageElement: HTMLDivElement) => {
            createBlob(imageElement, (blob) => {
                if (blob) {
                    uploadImage(blob, (cid) => {
                        console.log('cid ' + cid);
                        // TODO initiate contract transaction...
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

    // TODO
    // 1. Why is IPFS only uploading the mask frame? probably need to download user image blob and set that as source
    //      instead of just URL
    // 2. Call the verify function of the contract with the username, description, and IPFS hash (cid)
  
    const [username, setUsername] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [description, setDescription] = useState<string>();
    const { upload } = useUploadToIPFS();
    const imageRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    return (
      <Center padding={PAD_MD}>
        <VStack spacing={PAD_MD} width={["90%", "70%", "70%", "50%"]} fontSize="xl">
          <NFTPreview
            imageRef={imageRef}
            imageUrl={imageUrl} 
            username={username} 
            description={description} />
          <Input placeholder='username' onChange={(e) => {setUsername(e.target.value)}} />
          <Input placeholder='image URL' onChange={(e) => {setImageUrl(e.target.value)}} />
          <Input placeholder='description' onChange={(e) => {setDescription(e.target.value)}} />
          <Button onClick={() => upload(imageRef.current)}>Verify</Button>
        </VStack>
      </Center>
    );
  }
