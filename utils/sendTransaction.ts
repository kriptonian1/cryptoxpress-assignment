import { ethers } from 'ethers';
import getPrivateKey from './getPrivateKey';

const api = process.env.EXPO_PUBLIC_SEPOLIA_API as string;

const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(api);

function sendTransaction(to: string, amount: string) {
  getPrivateKey('polyPvtKey').then((privateKey) => {
    if (typeof privateKey !== 'string') {
      return;
    }
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);
    signer
      .sendTransaction({
        to,
        value: ethers.parseEther(amount),
      })
      .then((tx) => {
        console.log(tx);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

export default sendTransaction;
