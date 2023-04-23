import { HTMLChakraProps, Image, Box } from "@chakra-ui/react";
import mask from "../images/shoe_mask.png"

interface Props extends Partial<HTMLChakraProps<"div">> {
    imageRef?: React.MutableRefObject<HTMLElement>;
    imageUrl?: string ;
}
  
export default function VerifiedImage({ imageRef, imageUrl, ...rest }: Props) {
    return (
      <Box ref={imageRef} width="400px" height="400px" {...rest}>
        <Image src={imageUrl} position={"absolute"}/>
        <Image src={mask} position={"relative"}/>
      </Box>
    );
}
