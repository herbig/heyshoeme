import { BigNumber } from "ethers";
import { useLocation } from "react-router-dom";
import { COLLECTION_URL } from "../const";
import web3 from "web3";

export default function Redirect() {

  const path: string = useLocation().pathname;

  let username: string = path.substring(1, path.length).toLowerCase();

  if (username.startsWith('@')) {
    username = username.substring(1, path.length);
  }

  if (username.length > 15 || !/^[_a-z0-9]*$/.test(username)) {
    return (<>{window.location.replace('/')}</>);
  }

  const id: BigNumber = BigNumber.from(web3.utils.soliditySha3(username));

  return (<>{window.location.replace(COLLECTION_URL + ':' + id.toString())}</>);
}
