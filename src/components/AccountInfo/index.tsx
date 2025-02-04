import React from "react";
import { useNativeBalance } from "../../hooks/useBalance";
import { useEnsAvatarData } from "../../hooks/useEnsAvatar";
import useTruncateText from "../../hooks/useTruncateText";
import { AvatarIcon, ArrowDownIcon } from "../../../public/icons";
import { useDropdown } from "../../hooks/useDropdown";
import { ButtonProps, buttons } from "./buttons";
import { useWallet } from "../../contexts/WalletContext";
import { toast } from "react-toastify";

interface AccountInfoProps {
  walletAddress?: `0x${string}`;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ walletAddress }) => {
  const { balance, symbol, isLoading } = useNativeBalance();

  const { ensName, ensAvatar } = useEnsAvatarData();

  const {
    isOpen: accountDropdownOpen,
    setIsOpen: setAccountDropdownOpen,
    dropdownRef: accountDropdownRef,
    buttonRef: accountButtonRef,
    handleMouseLeave: handleAccountMouseLeave,
  } = useDropdown();

  const {
    disconnectWallet,
    signMessage,
    isSigning,
    disconnecting,
    hasSignedMessage,
    resetSignatureState,
  } = useWallet();

  const handleSignMessage = async () => {
    if (hasSignedMessage) {
      const confirmResign = window.confirm(
        "You have already signed a message. Would you like to sign again? This is typically only needed if there was an issue with the previous signature."
      );
      if (!confirmResign) {
        return;
      }

      resetSignatureState();
    }

    try {
      await signMessage();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Failed to sign message: ${error.message}`, {
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to sign message. Please try again.", {
          autoClose: 3000,
        });
      }
    }
  };

  return (
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
                    handleSignMessage();
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
  );
};

export default AccountInfo;
