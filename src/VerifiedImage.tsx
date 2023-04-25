import { HTMLChakraProps, Image, Box } from "@chakra-ui/react";
import mask from "./images/shoe_mask.png"
import { useEffect, useState } from "react";

interface Props extends Partial<HTMLChakraProps<"div">> {
    imageRef?: React.MutableRefObject<HTMLElement>;
    imageUrl?: string;
}
  
export default function VerifiedImage({ imageRef, imageUrl, ...rest }: Props) {

  const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    async function fetchData() {
      if (imageUrl) {
        try {
          setBlob(await fetch(imageUrl).then(r => r.blob()));
        } catch(e) {
          setBlob(undefined);
        }
      } else {
        setBlob(undefined);
      }
    }
    fetchData();
  }, [imageUrl]);

  return (
    <Box ref={imageRef} width="400px" height="400px" {...rest}>
      <Image src={blob ? URL.createObjectURL(blob) : undefined} position={"absolute"} />
      <Image src={mask} position={"relative"} />
    </Box>
  );
}
