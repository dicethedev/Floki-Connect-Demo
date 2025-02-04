export const formattedBalance = (balance: string) => {
  const numericBalance = parseFloat(balance);
  return numericBalance.toFixed(5);
};
