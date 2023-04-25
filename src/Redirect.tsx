import { BigNumber } from "ethers";
import { useLocation } from "react-router-dom";
import web3 from "web3";
import { COLLECTION_URL } from "./const";

export default function Redirect() {

  const path: string = useLocation().pathname;

  // clip the '/'
  let username: string = path.substring(1, path.length);

  // clip the @, if it's there, which allows either /username or /@username urls
  if (username.startsWith('@')) {
    username = username.substring(1, path.length);
  }

  // usernames can't be larger than 15 characters or have anything other 
  // than letters, numbers, or underscores
  if (username.length > 15 || !/^[_a-z0-9]*$/.test(username)) {
    return (<>{window.location.replace('/')}</>);
  }

  // the ERC721 id on chain is calculated as the keccak256 hash of the username (without @)
  // followed by casting it to uint256, so we do the same here, allowing us to know the NFT id
  // of any string even before it's created
  const id: BigNumber = BigNumber.from(web3.utils.soliditySha3(username));

  return (<>{window.location.replace(COLLECTION_URL + id.toString())}</>);
}
