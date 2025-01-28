import { http, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";
// import { PhantomConnector } from "phantom-wagmi-connector";

export const WALLETCONNECT_PROJECT_ID =
  import.meta.env.WALLETCONNECT_PROJECT_ID ?? "test";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn("You need to provide a WALLETCONNECT_PROJECT_ID env variable");
}

export const walletConfig = createConfig({
  chains: [mainnet, bsc],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    // new PhantomConnector({ chains }),
    walletConnect({ projectId: WALLETCONNECT_PROJECT_ID, showQrModal: true }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
