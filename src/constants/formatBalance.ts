// Function to round balance and format it
export const formatBalance = (balance: string, precision: number): string => {
  const numericBalance = parseFloat(balance);

  // Return '0' if balance is 0
  if (numericBalance === 0) return "0";

  const factor = Math.pow(10, precision); // Calculate power of 10 for precision
  const roundedBalance = (Math.round(numericBalance * factor) / factor).toFixed(
    precision
  );

  return roundedBalance;
};
