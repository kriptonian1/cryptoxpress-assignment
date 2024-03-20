import { ethers } from 'ethers';

const api = process.env.EXPO_PUBLIC_SEPOLIA_API as string;

const provider = new ethers.JsonRpcProvider(api);

async function getBalanceSepolia(address: string) {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

export default getBalanceSepolia;
