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

/**
 * AccountInfo Component
 *
 * This component displays the wallet's account information including:
 * - The native balance and currency symbol.
 * - ENS avatar (if available) or a default avatar icon.
 * - The truncated wallet address.
 *
 * Additionally, it provides a dropdown menu with buttons for actions like
 * disconnecting the wallet or signing a message.
 *
 * @param {AccountInfoProps} props - The props for the component.
 * @returns {JSX.Element} The rendered account information component.
 */
const AccountInfo: React.FC<AccountInfoProps> = ({ walletAddress }) => {
  const { balance, symbol, isLoading } = useNativeBalance();

  const { ensName, ensAvatar } = useEnsAvatarData();

  //custom dropdown hook to manage dropdown open state, refs, and mouse events.
  const {
    isOpen: accountDropdownOpen,
    setIsOpen: setAccountDropdownOpen,
    dropdownRef: accountDropdownRef,
    buttonRef: accountButtonRef,
    handleMouseLeave: handleAccountMouseLeave,
  } = useDropdown();

  // Retrieve wallet-related functions and state from the WalletContext.
  const {
    disconnectWallet,
    signMessage,
    isSigning,
    disconnecting,
    hasSignedMessage,
    resetSignatureState,
  } = useWallet();

  /**
   * Handles signing a message.
   *
   * If a message has already been signed, it confirms with the user whether to re-sign.
   * If confirmed (or if no message has been signed yet), it attempts to sign the message.
   * On failure, it shows an appropriate toast error.
   */
  const handleSignMessage = async () => {
    if (hasSignedMessage) {
      const confirmResign = window.confirm(
        "You have already signed a message. Would you like to sign again? This is typically only needed if there was an issue with the previous signature."
      );
      if (!confirmResign) {
        return;
      }
      // Reset the signature state if re-signing is confirmed.
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
        {/* Display the wallet balance and currency symbol */}
        <p className="text-[#131313] font-medium text-sm">
          {isLoading ? "Loading..." : balance} {symbol}
        </p>
        {/* Vertical divider */}
        <div className="h-5 w-[1px] bg-[#E1E4EA] mx-2"></div>
        {/* Display the ENS avatar if available, else a default avatar icon */}
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

        {/* Display the truncated wallet address */}
        <p className="text-sm">
          {useTruncateText(walletAddress || "0x00...0000")}
        </p>
        <ArrowDownIcon />
      </button>

      {/* Render the dropdown menu if it is open */}
      {accountDropdownOpen && (
        <ul
          id="account-dropdown"
          ref={accountDropdownRef}
          className="absolute mt-[8px] w-full p-[16px] bg-[#F2F5F8] rounded-[10px] z-10 flex flex-col gap-[8px]"
          onMouseLeave={handleAccountMouseLeave}
          role="menu"
        >
          {/* Iterate over available buttons (e.g., "Disconnect", "Sign Message") */}
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
