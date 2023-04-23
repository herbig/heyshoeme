import { HTMLChakraProps, VStack, Text } from "@chakra-ui/react";
import VerifiedImage from "./VerifiedImage";

interface Props extends Partial<HTMLChakraProps<"div">> {
    imageUrl?: string;
    username?: string;
    description?: string;
}
  
export default function NFTPreview({ imageUrl, username, description, ...rest }: Props) {
    return (
      <VStack {...rest}>
        <VerifiedImage imageUrl={imageUrl} />
        <Text fontWeight='bold'>{username ? '@' + username : 'ㅤ'}</Text>
        <Text fontSize='sm'>{description ? description : 'ㅤ'}</Text>
      </VStack>
    );
}
