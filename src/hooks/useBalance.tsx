import { useAccount, useBalance } from "wagmi";

interface BalanceData {
  balance?: string;
  symbol?: string;
  isLoading: boolean;
  isError: boolean;
}

export function useNativeBalance(): BalanceData {
  const { address, chain } = useAccount();

  const { data, isLoading, isError } = useBalance({
    address,
  });

  const symbol = chain?.nativeCurrency?.symbol || "ETH";

  return {
    balance: data?.formatted || "0",
    symbol,
    isLoading,
    isError,
  };
}
