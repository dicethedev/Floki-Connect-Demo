import { ReactNode } from "react";
import {
  MetamaskIcon,
  CoinbaseIcon,
  PhantomIcon,
  WalletconnectIcon,
} from "../../../public/icons";

/**
 * Interface representing a wallet option.
 *
 * Each wallet option includes:
 * - `label`: The name of the wallet (optional).
 * - `icon`: A ReactNode representing the wallet's icon (optional).
 */
interface WalletOption {
  label?: string | undefined;
  icon?: ReactNode;
}

/**
 * Array of wallet options available for selection.
 *
 * This array defines the supported wallet options along with their respective icons.
 * It is used to populate a wallet selection component in the user interface.
 **/

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
