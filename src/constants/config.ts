import { http, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

/**
 * WalletConnect Project ID
 *
 * This ID is required for WalletConnect functionality.
 * It's fetched from environment variables, with a fallback to "test".
 */
export const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "test";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn("You need to provide a WALLETCONNECT_PROJECT_ID env variable");
}

const chains = [mainnet, bsc] as const;

/**
 * Wallet Configuration
 *
 * This configuration sets up the blockchain networks and wallet connectors
 * supported by the application.
 */
export const walletConfig = createConfig({
  chains,
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: "Floki connect demo", preference: "all" }),
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true,
      qrModalOptions: {
        themeVariables: {
          "--wcm-z-index": "9999", // Ensure QR modal appears above other elements
        },
      },
    }),
  ],
  // Transport configurations for each chain
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
