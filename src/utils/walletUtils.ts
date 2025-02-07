import type { Connector } from "wagmi";

/**
 * Get a connector by wallet name
 *
 * This function finds and returns the appropriate connector for a given wallet name.
 *
 * @param {string} walletName - The name of the wallet to find a connector for
 * @param {readonly Connector[]} connectors - An array of available connectors
 * @returns {Connector | undefined} The matching connector, or undefined if not found
 *
 * @example
 * const connectors = [metamaskConnector, coinbaseWalletConnector, ...];
 * const metamaskConnector = getConnectorForWallet('MetaMask', connectors);
 */
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

/**
 * Check if a wallet is installed
 *
 * This function checks whether a specific wallet is installed in the user's browser.
 *
 * @param {string} walletName - The name of the wallet to check
 * @returns {boolean} True if the wallet is installed, false otherwise
 *
 * @example
 * if (isWalletInstalled('MetaMask')) {
 *   console.log('MetaMask is installed');
 * }
 */
export const isWalletInstalled = (walletName: string): boolean => {
  // Ensure we're in a browser environment
  if (typeof window === "undefined") return false;

  switch (walletName.toLowerCase()) {
    case "metamask":
      return (
        typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask
      );
    case "coinbase wallet":
      return (
        typeof window.ethereum !== "undefined" &&
        window.ethereum.isCoinbaseWallet
      );
    case "phantom":
      return typeof window.solana !== "undefined";
    case "walletconnect":
      // WalletConnect uses a QR code so it's always considered "installed"
      return true;
    default:
      return false;
  }
};

/**
 * Get the wallet installation link
 *
 * This function returns the installation link for a given wallet.
 *
 * @param {string} walletName - The name of the wallet
 * @returns {string} The installation link for the wallet
 *
 * @example
 * const metamaskLink = getWalletInstallLink('MetaMask');
 * console.log(`Install MetaMask here: ${metamaskLink}`);
 */
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
