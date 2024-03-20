/**
 * Formats the given address by replacing the middle characters with ellipsis.
 * @param address - The address to be formatted.
 * @returns The formatted address.
 */
function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default formatAddress;
