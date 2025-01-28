import React, { useState } from "react";
import { switchChain } from "@wagmi/core";
import { useNativeBalance } from "../../hooks/useBalance";
import { networks, NetworkProps } from "./networks";
import { ButtonProps, buttons } from "./buttons";
import { ArrowDownIcon, AvatarIcon } from "../../../public/icons";
import { walletConfig } from "../../constants/config";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import useTruncateText from "../../hooks/useTruncateText";
import { useEnsAvatarData } from "../../hooks/useEnsAvatar";
import { useWallet } from "../../contexts/WalletContext";
import { useDropdown } from "../../hooks/useDropdown";

interface WalletProps {
  walletAddress?: `0x${string}`;
}

const NetworkSwitcher: React.FC<WalletProps> = ({ walletAddress }) => {
  const { chainId } = useAccount();
  const { disconnectWallet, signMessage, isSigning, disconnecting } =
    useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProps>(
    networks[0]
  );
  const { balance, symbol, isLoading, isError } = useNativeBalance();
  const [switchchainLoading, setSwitchchainLoading] = useState<boolean>(false);

  const { ensName, ensAvatar } = useEnsAvatarData();

  const {
    isOpen: networkDropdownOpen,
    setIsOpen: setNetworkDropdownOpen,
    dropdownRef: networkDropdownRef,
    buttonRef: networkButtonRef,
    handleMouseLeave: handleNetworkMouseLeave,
  } = useDropdown();

  const {
    isOpen: accountDropdownOpen,
    setIsOpen: setAccountDropdownOpen,
    dropdownRef: accountDropdownRef,
    buttonRef: accountButtonRef,
    handleMouseLeave: handleAccountMouseLeave,
  } = useDropdown();

  const handleNetworkChange = (network: NetworkProps) => {
    setSelectedNetwork(network);
    handleOnClick(network.label, network.chainId);
  };

  const handleOnClick = async (network: string, id: number) => {
    if (!network || !id) {
      console.error("Invalid network or chain ID");
      toast.error("Invalid network or chain ID.");
      return;
    }

    if (chainId === id) {
      setNetworkDropdownOpen(false);
      return;
    }
    setSwitchchainLoading(true);

    try {
      await switchChain(walletConfig, {
        chainId: id as 1 | 56,
      });

      setNetworkDropdownOpen(false);
      toast.success(`Switched to ${network} successfully!`, {
        position: "top-left",
        autoClose: 3000,
      });
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

  const handleSignMessageBTN = async () => {
    try {
      await signMessage();
      toast.success("Message signed successfully!", {
        autoClose: 2000
      });
    } catch (error: unknown) {
      toast.error("Failed to sign message. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  if (isError) {
    toast.error("Error fetching balance. Please try again.", {
      position: "top-left",
      autoClose: 3000,
    });
  }

  return (
    <div
      className="flex gap-[8px]"
      role="navigation"
      aria-label="Wallet Network Switcher"
    >
      {/* ----------- Network Dropdown ------ */}
      <div className="relative">
        <button
          ref={networkButtonRef}
          aria-expanded={networkDropdownOpen}
          aria-controls="network-dropdown"
          className="flex justify-between items-center cursor-pointer w-[140px] h-[40px] p-[10px] bg-[#F2F5F8] rounded-[10px] text-[#131313] font-medium text-sm"
          onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
        >
          {selectedNetwork.icon && <span>{selectedNetwork.icon}</span>}
          <span>{selectedNetwork.label}</span>
          <ArrowDownIcon />
        </button>
        {networkDropdownOpen && (
          <ul
            id="network-dropdown"
            ref={networkDropdownRef}
            className="absolute mt-[8px] w-[140px] p-[10px] gap-[8px] bg-[#F2F5F8] rounded-[10px] z-10"
            onMouseLeave={handleNetworkMouseLeave}
            aria-labelledby="network-dropdown"
            role="menu"
          >
            {networks.map((network: NetworkProps) => (
              <li
                key={network.value}
                className="flex items-center gap-[4px] px-4 py-2 cursor-pointer"
                onClick={() => {
                  handleNetworkChange(network);
                  setNetworkDropdownOpen(false);
                }}
                role="menuitem"
                aria-selected={
                  network.chainId === selectedNetwork.chainId ? "true" : "false"
                }
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

      {/* Balance and Address*/}
      <div className="relative">
        <button
          ref={accountButtonRef}
          aria-expanded={accountDropdownOpen}
          aria-controls="account-dropdown"
          className="flex items-center gap-2 justify-between w-full h-[40px] p-[10px] bg-[#F2F5F8] rounded-[10px] text-[#131313] font-medium text-sm cursor-pointer"
          onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
        >
          <p className="text-[#131313] font-medium text-sm">
            {isLoading ? "Loading..." : balance} {symbol}
          </p>
          <div className="h-5 w-[1px] bg-[#E1E4EA] mx-2"></div>
          {ensAvatar ? (
            <img
              src={ensAvatar}
              className="w-[16px] h-[16px] rounded-full"
              alt={`${ensName} avatar`}
            />
          ) : (
            <span>
              <AvatarIcon />
            </span>
          )}
          <p className="text-sm">
            {useTruncateText(walletAddress || "0x00...0000")}
          </p>
          <ArrowDownIcon />
        </button>

        {accountDropdownOpen && (
          <ul
            id="account-dropdown"
            ref={accountDropdownRef}
            className="absolute mt-[8px] w-full p-[16px] bg-[#F2F5F8] rounded-[10px] z-10 flex flex-col gap-[8px]"
            onMouseLeave={handleAccountMouseLeave}
            role="menu"
          >
            {buttons.map((button: ButtonProps, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 ${button.bgColor} text-center w-full ${button.textColor} rounded-[10px] flex justify-center items-center gap-2 cursor-pointer`}
                  onClick={() => {
                    if (button.label === "Disconnect") {
                      disconnectWallet();
                      setAccountDropdownOpen(false);
                    } else if (button.label === "Sign Message") {
                      handleSignMessageBTN();
                      setAccountDropdownOpen(false);
                    }
                  }}
                  role="menuitem"
                >
                  {button.icon && <span>{button.icon}</span>}
                  {button.label === "Disconnect" && disconnecting
                    ? "Disconnecting..."
                    : button.label === "Sign Message" && isSigning
                    ? "Signing..."
                    : button.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NetworkSwitcher;
