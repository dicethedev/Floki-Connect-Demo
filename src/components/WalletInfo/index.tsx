import React from "react";
import NetworkSwitcher from "../NetworkSwitcher";
import AccountInfo from "../AccountInfo";
import { useAccount } from "wagmi";

/**
 * WalletInfo Component
 *
 * This component displays wallet-related information by combining the NetworkSwitcher
 * and AccountInfo components. It retrieves the connected wallet's address using the
 * `useAccount` hook from wagmi.
 *
 * @returns {React.ReactElement} A section that displays the network switcher and account information.
 */
const WalletInfo: React.FC = () => {
  const { address } = useAccount();

  return (
    <div
      className="flex gap-[8px]"
      role="navigation"
      aria-label="Wallet Network Switcher"
    >
      {/* Component to switch between different networks */}
      <NetworkSwitcher />
      {/* Component to display account details including the wallet address */}
      <AccountInfo walletAddress={address} />
    </div>
  );
};

export default WalletInfo;
