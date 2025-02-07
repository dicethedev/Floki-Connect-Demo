import { ReactNode } from "react";
import { bsc, mainnet } from "wagmi/chains";
import { EthereumIcon, BinanceSmartChainIcon } from "../../../public/icons";

//***Represents the available network types.
export type Network = "mainnet" | "bsc";

export interface NetworkProps {
  label: string;
  value?: Network;
  onClick?: (network: Network) => void;
  chainId: number;
  icon?: ReactNode;
  rpcUrl?: string;
}

/**
 * Array of network options available for switching.
 *
 * Each network option includes its display name, value, chain ID, icon, and optionally an RPC URL.
 */
export const networks: NetworkProps[] = [
  {
    label: "Ethereum",
    value: "mainnet",
    chainId: mainnet.id,
    icon: <EthereumIcon />,
    rpcUrl: "https://mainnet.gateway.tenderly.co",
  },
  {
    label: "BNB Chain",
    value: "bsc",
    icon: <BinanceSmartChainIcon />,
    chainId: bsc.id,
    rpcUrl: "https://binance.llamarpc.com",
  },
];
