function convertGasToEth(gas: string, gasPriceInGwei: string) {
  const gasPriceInEth = Number(gasPriceInGwei) / 1e9; // Convert Gwei to ETH
  return Number(gas) * gasPriceInEth;
}

export default convertGasToEth;
