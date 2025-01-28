import { ReactNode } from "react";
import {
  MetamaskIcon,
  CoinbaseIcon,
  PhantomIcon,
  WalletconnectIcon,
} from "../../../public/icons";

interface WalletOption {
  label?: string;
  icon?: ReactNode;
}

export const walletOptions: WalletOption[] = [
  {
    label: "MetaMask",
    icon: <MetamaskIcon />,
  },
  {
    label: "Coinbase Wallet",
    icon: <CoinbaseIcon />,
  },
  {
    label: "Phantom",
    icon: <PhantomIcon />,
  },
  {
    label: "WalletConnect",
    icon: <WalletconnectIcon />,
  },
];
