import React, { useState } from "react";
import { switchChain } from "@wagmi/core";
import { networks, NetworkProps } from "./networks";
import { ArrowDownIcon } from "../../../public/icons";
import { walletConfig } from "../../constants/config";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDropdown } from "../../hooks/useDropdown";

/**
 * NetworkSwitcher Component
 *
 * This component provides a UI for switching between different blockchain networks.
 * It displays a button showing the currently selected network, and when clicked,
 * it opens a dropdown menu with all available networks.
 *
 * The component leverages the `useAccount` hook to retrieve the current chain ID,
 * the `useDropdown` hook to manage dropdown visibility and interactions,
 * and the `switchChain` function from `@wagmi/core` to change the network.
 *
 * @returns {JSX.Element} The rendered network switcher component.
 */
const NetworkSwitcher: React.FC = () => {
  const { chainId } = useAccount();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProps>(
    networks[0]
  );
  const [switchchainLoading, setSwitchchainLoading] = useState<boolean>(false);

  // Custom dropdown hook for managing the dropdown's open state and refs.
  const {
    isOpen: networkDropdownOpen,
    setIsOpen: setNetworkDropdownOpen,
    dropdownRef: networkDropdownRef,
    buttonRef: networkButtonRef,
    handleMouseLeave: handleNetworkMouseLeave,
  } = useDropdown();

  /**
   * Handles switching the network when a network option is selected.
   *
   * This function performs several tasks:
   * 1. Validates the network object and its chainId.
   * 2. Checks if the selected network is already active.
   * 3. Initiates the chain switch using `switchChain` with the provided wallet configuration.
   * 4. Provides success/error feedback via toast notifications.
   *
   * @param {NetworkProps} network - The network option that was selected.
   */
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
        {/* Display the current network's icon if available */}
        {selectedNetwork.icon && <span>{selectedNetwork.icon}</span>}
        {/* Display the current network's label */}
        <span>{selectedNetwork.label}</span>
        <ArrowDownIcon />
      </button>

      {/* Render the dropdown menu if it is open */}
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
              {/* Display the network's icon */}
              {network.icon}
              {/* Display the network's label */}
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
