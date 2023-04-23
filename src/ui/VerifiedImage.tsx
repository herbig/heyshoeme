import { HTMLChakraProps, Image, Box } from "@chakra-ui/react";
import mask from "../images/shoe_mask.png"

interface Props extends Partial<HTMLChakraProps<"div">> {
    imageUrl?: string ;
}
  
export default function VerifiedImage({ imageUrl, ...rest }: Props) {
    return (
      <Box width="400px" height="400px" {...rest}>
        <Image src={imageUrl} position={"absolute"}/>
        <Image src={mask} position={"relative"}/>
      </Box>
    );
}
