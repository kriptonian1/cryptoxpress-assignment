function convertWeiToEth(valueInWei: string): string {
  const valueInEth = Number(valueInWei) / Number(1e18);
  return valueInEth.toString();
}

export default convertWeiToEth;
