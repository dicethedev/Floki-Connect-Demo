import { http, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

export const WALLETCONNECT_PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "test";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn("You need to provide a WALLETCONNECT_PROJECT_ID env variable");
}

// console.log("WalletConnect Project ID:", WALLETCONNECT_PROJECT_ID);

const chains = [mainnet, bsc] as const;

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
          "--wcm-z-index": "9999",
        },
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
