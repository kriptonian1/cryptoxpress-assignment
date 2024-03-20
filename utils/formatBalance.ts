function formatBalance(balance: string) {
  let num = parseFloat(balance);
  if (isNaN(num)) {
    console.error('Invalid balance');
    return '';
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default formatBalance;
