import type { Connector } from "wagmi";

//****Function to get a connector by wallet name
export const getConnectorForWallet = (
  walletName: string,
  connectors: readonly Connector[]
): Connector | undefined => {
  switch (walletName.toLowerCase()) {
    case "metamask":
      return connectors.find((c) => c.name === "MetaMask");
    case "coinbase wallet":
      return connectors.find((c) => c.name === "Coinbase Wallet");
    case "phantom":
      return connectors.find((c) => c.name === "Phantom");
    case "walletconnect":
      return connectors.find((c) => c.name === "WalletConnect");
    default:
      return undefined;
  }
};

//****Function to check if a wallet is installed
export const isWalletInstalled = (walletName: string): boolean => {
  switch (walletName.toLowerCase()) {
    case "metamask":
      return (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isMetaMask
      );
    case "coinbase wallet":
      return (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isCoinbaseWallet
      );
    case "phantom":
      return (
        typeof window !== "undefined" && typeof window.solana !== "undefined"
      );
    case "walletconnect":
      // WalletConnect uses a QR code so it will return true
      return true;
    default:
      return false;
  }
};

//****Function to get the wallet installation link
export const getWalletInstallLink = (walletName: string): string => {
  switch (walletName.toLowerCase()) {
    case "metamask":
      return "https://metamask.io/download/";
    case "coinbase wallet":
      return "https://www.coinbase.com/wallet/downloads";
    case "phantom":
      return "https://phantom.app/download";
    default:
      return "#";
  }
};
