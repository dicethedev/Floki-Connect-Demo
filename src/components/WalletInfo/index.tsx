import React from "react";
import NetworkSwitcher from "../NetworkSwitcher";
import AccountInfo from "../AccountInfo";
import { useAccount } from "wagmi";

const WalletInfo: React.FC = () => {
  const { address } = useAccount();

  return (
    <div
      className="flex gap-[8px]"
      role="navigation"
      aria-label="Wallet Network Switcher"
    >
      <NetworkSwitcher />
      <AccountInfo walletAddress={address} />
    </div>
  );
};

export default WalletInfo;
