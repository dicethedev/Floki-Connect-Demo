import { useAccount, useBalance } from "wagmi";

//***Interface representing the native balance data.
interface BalanceData {
  balance?: string;
  symbol?: string;
  isLoading: boolean;
  isError: boolean;
}

/**
 * Custom hook to retrieve the native balance of the connected wallet.
 *
 * This hook uses the `useAccount` hook from wagmi to access the connected wallet's
 * address and chain details, and the `useBalance` hook to fetch the corresponding balance data.
 *
 * The native currency symbol is extracted from the chain's nativeCurrency information.
 * If unavailable, it defaults to "ETH".
 *
 * @returns {BalanceData} An object containing:
 *  - `balance`: The formatted balance string (or "0" if not available).
 *  - `symbol`: The native currency symbol.
 *  - `isLoading`: A boolean indicating if the balance is loading.
 *  - `isError`: A boolean indicating if there was an error fetching the balance.
 */
export function useNativeBalance(): BalanceData {
  const { address, chain } = useAccount();

  const { data, isLoading, isError } = useBalance({
    address,
  });

  // Extract the native currency symbol from the chain data, defaulting to "ETH" if not present.
  const symbol = chain?.nativeCurrency?.symbol || "ETH";

  return {
    // Return the formatted balance; default to "0" if balance data is not available.
    balance: data?.formatted || "0",
    symbol,
    isLoading,
    isError,
  };
}
