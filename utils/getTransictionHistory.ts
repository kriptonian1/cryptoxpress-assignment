import { ApiResponse } from '@/types';

async function getTransactionHistory(address: string): Promise<ApiResponse> {
  console.log('env', process.env.EXPO_PUBLIC_ETHERSCAN_API_KEY as string);

  const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.EXPO_PUBLIC_ETHERSCAN_API_KEY as string}`;
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((error) =>
      console.error('Error fetching transaction history', error)
    );
  // console.log("response", response);

  return response;
}

export default getTransactionHistory;
