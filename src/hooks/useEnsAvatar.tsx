import { useEnsAvatar, useEnsName, useAccount } from "wagmi";

/**
 * Interface representing ENS (Ethereum Name Service) data
 */
interface EnsData {
  ensName?: string;
  ensAvatar?: string | undefined;
}

/**
 * Custom hook to fetch ENS name and avatar for the connected account
 *
 * This hook uses wagmi's useAccount, useEnsName, and useEnsAvatar hooks
 * to retrieve the ENS data for the currently connected Ethereum account.
 *
 * @returns {EnsData} An object containing the ENS name and avatar URL (if available)
 *
 * @example
 * const { ensName, ensAvatar } = useEnsAvatarData();
 * if (ensName) {
 *   console.log(`ENS Name: ${ensName}`);
 * }
 * if (ensAvatar) {
 *   console.log(`ENS Avatar URL: ${ensAvatar}`);
 * }
 */
export function useEnsAvatarData(): EnsData {
  // Get the current account address
  const { address } = useAccount();

  // Fetch the ENS name for the current address
  const { data: ensName } = useEnsName({ address });

  // Fetch the ENS avatar using the retrieved ENS name
  // Note: This will only work if an ENS name is found
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // Return the ENS data, converting null values to undefined for consistency
  return {
    ensName: ensName === null ? undefined : ensName,
    ensAvatar: ensAvatar === null ? undefined : ensAvatar,
  };
}
