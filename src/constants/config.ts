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

const chains = [mainnet, bsc] as const;

export const walletConfig = createConfig({
  chains,
  connectors: [
    metaMask(),
    coinbaseWallet({ preference: "all" }),
    injected({ shimDisconnect: true, target: "phantom" }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      qrModalOptions: {
        themeMode: "dark",
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
