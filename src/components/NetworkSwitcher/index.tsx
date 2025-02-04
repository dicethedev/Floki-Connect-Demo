import React, { useState } from "react";
import { switchChain } from "@wagmi/core";
import { networks, NetworkProps } from "./networks";
import { ArrowDownIcon } from "../../../public/icons";
import { walletConfig } from "../../constants/config";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDropdown } from "../../hooks/useDropdown";

const NetworkSwitcher: React.FC = () => {
  const { chainId } = useAccount();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProps>(
    networks[0]
  );
  const [switchchainLoading, setSwitchchainLoading] = useState<boolean>(false);

  const {
    isOpen: networkDropdownOpen,
    setIsOpen: setNetworkDropdownOpen,
    dropdownRef: networkDropdownRef,
    buttonRef: networkButtonRef,
    handleMouseLeave: handleNetworkMouseLeave,
  } = useDropdown();

  const handleNetworkChange = async (network: NetworkProps) => {
    if (!network || !network.chainId) {
      toast.error("Invalid network or chain ID.");
      return;
    }

    if (chainId === network.chainId) {
      setNetworkDropdownOpen(false);
      return;
    }

    setSwitchchainLoading(true);
    try {
      await switchChain(walletConfig, { chainId: network.chainId as 1 | 56 });
      setNetworkDropdownOpen(false);
      toast.success(`Switched to ${network.label} successfully!`, {
        position: "top-left",
        autoClose: 3000,
      });
      setSelectedNetwork(network);
    } catch (error) {
      console.error("Error switching chains:", error);
      toast.error("An error occurred while switching chains. Retry again!", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setSwitchchainLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={networkButtonRef}
        aria-expanded={networkDropdownOpen}
        className="flex justify-between items-center w-[140px] h-[40px] p-[10px] bg-[#F2F5F8] rounded-[10px] text-[#131313] font-medium text-sm cursor-pointer"
        onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
      >
        {selectedNetwork.icon && <span>{selectedNetwork.icon}</span>}
        <span>{selectedNetwork.label}</span>
        <ArrowDownIcon />
      </button>
      {networkDropdownOpen && (
        <ul
          ref={networkDropdownRef}
          className="absolute mt-[8px] w-[140px] p-[10px] gap-[8px] bg-[#F2F5F8] rounded-[10px] z-10"
          onMouseLeave={handleNetworkMouseLeave}
        >
          {networks.map((network) => (
            <li
              key={network.value}
              className="flex items-center gap-[4px] px-4 py-2 cursor-pointer"
              onClick={() => handleNetworkChange(network)}
            >
              {network.icon}
              <span className="text-[#131313] font-medium text-xs">
                {network.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NetworkSwitcher;
