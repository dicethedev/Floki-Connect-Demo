import React, { useEffect, useState, useRef, useCallback } from "react";
import { switchChain } from "@wagmi/core";
import { useNativeBalance } from "../../hooks/useBalance";
import { networks, NetworkProps } from "./networks";
import { ButtonProps, buttons } from "./buttons";
import { ArrowDownIcon, AvatarIcon } from "../../../public/icons";
import { walletConfig } from "../../constants/config";
import { useAccount, useDisconnect } from "wagmi";
import { toast } from "react-toastify";
import useTruncateText from "../../hooks/useTruncateText";
import useSignMessage from "../../hooks/useSignMessage";
import { useEnsAvatarData } from "../../hooks/useEnsAvatar";

interface WalletProps {
  walletAddress?: `0x${string}`;
}

const NetworkSwitcher: React.FC<WalletProps> = ({ walletAddress }) => {
  const { chainId, address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProps>(
    networks[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownOpenAccountDetails, setDropdownOpenAccountDetails] =
    useState<boolean>(false);
  const { balance, symbol, isLoading, isError } = useNativeBalance();
  const [disconnecting, setDisconnecting] = useState<boolean>(false);
  const [switchchainLoading, setSwitchchainLoading] = useState<boolean>(false);

  const { sign, isSigning } = useSignMessage();
  const { ensName, ensAvatar } = useEnsAvatarData();

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const dropdownAccountRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const accountButtonRef = useRef<HTMLButtonElement | null>(null);

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
      setDropdownOpen(false);
      return;
    }
    setSwitchchainLoading(true);

    try {
      await switchChain(walletConfig, {
        chainId: id as 1 | 56,
      });

      setDropdownOpen(false);
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

  const handleSignMessage = async () => {
    const message = "Sign this message to confirm your action";
    try {
      await sign(message);
    } catch (error) {
      toast.error("Error signing message.", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (address) {
      handleSignMessage();
    }
  }, [address]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickInsideDropdown =
      dropdownRef.current?.contains(event.target as Node) ||
      dropdownAccountRef.current?.contains(event.target as Node) ||
      buttonRef.current?.contains(event.target as Node) ||
      accountButtonRef.current?.contains(event.target as Node);

    if (!isClickInsideDropdown) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    const events: Array<keyof DocumentEventMap> = [
      "pointerdown",
      "pointerup",
      "pointermove",
    ];
    events.forEach((event) =>
      document.addEventListener(event, handleClickOutside as EventListener)
    );

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleClickOutside as EventListener)
      );
    };
  }, [handleClickOutside]);

  const handleNetworkMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleAccountMouseLeave = () => {
    setDropdownOpenAccountDetails(false);
  };

  const handleDisconnect = async () => {
    if (disconnecting) return;
    setDisconnecting(true);

    try {
      if (disconnectAsync) {
        await disconnectAsync();
        setDropdownOpenAccountDetails(false);
        toast.success("Disconnected successfully!", {
          position: "top-left",
          autoClose: 3000,
        });
      } else {
        throw new Error("Disconnect function is not available.");
      }
    } catch (error) {
      console.error("Error during disconnect:", error);
      toast.error("An error occurred while disconnecting.", {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setDisconnecting(false);
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
          ref={buttonRef}
          aria-expanded={dropdownOpen}
          aria-controls="network-dropdown"
          className="flex justify-between items-center cursor-pointer w-[140px] h-[40px] p-[10px] bg-[#F2F5F8] rounded-[10px] text-[#131313] font-medium text-sm"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedNetwork.icon && <span>{selectedNetwork.icon}</span>}
          <span>{selectedNetwork.label}</span>
          <ArrowDownIcon />
        </button>
        {dropdownOpen && (
          <ul
            id="network-dropdown"
            ref={dropdownRef}
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
                  setDropdownOpen(false);
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
          aria-expanded={dropdownOpenAccountDetails}
          aria-controls="account-dropdown"
          className="flex items-center gap-2 justify-between w-full h-[40px] p-[10px] bg-[#F2F5F8] rounded-[10px] text-[#131313] font-medium text-sm cursor-pointer"
          onClick={() =>
            setDropdownOpenAccountDetails(!dropdownOpenAccountDetails)
          }
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

        {dropdownOpenAccountDetails && (
          <ul
            id="account-dropdown"
            ref={dropdownAccountRef}
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
                      handleDisconnect();
                      setDropdownOpenAccountDetails(false);
                    } else if (button.label === "Sign Message") {
                      handleSignMessage();
                      setDropdownOpenAccountDetails(false);
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
