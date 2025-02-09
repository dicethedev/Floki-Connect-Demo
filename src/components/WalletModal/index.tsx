import type React from "react";
import { toast } from "react-toastify";
import { CloseIcon } from "../../../public/icons";
import { walletOptions } from "./walletOptions";
import type { Connector } from "wagmi";
import { useModalDismiss } from "../../hooks/useModalDismiss";
import {
  getConnectorForWallet,
  isWalletInstalled,
  getWalletInstallLink,
} from "../../utils/walletUtils";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (connector: Connector) => Promise<void>;
  connectors: readonly Connector[];
}

/**
 * WalletModal Component
 *
 * This component renders a modal dialog that displays various wallet options for users to connect.
 * It handles:
 * - Dismissing the modal when clicking outside (using `useModalDismiss`).
 * - Checking if a selected wallet is installed.
 * - Providing an installation link if the wallet is not installed.
 * - Initiating the connection process via the provided onConnect callback.
 *
 * @param {WalletModalProps} props - The properties for the WalletModal component.
 * @returns {React.ReactElement | null} The modal element if open, otherwise null.
 */
const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  connectors,
}) => {
  // Hook to automatically dismiss the modal when clicking outside or pressing escape.
  const modalRef = useModalDismiss<HTMLDivElement>(onClose);

  if (!isOpen) return null;

  /**
   * Handles the connection process for a given wallet.
   *
   * This function performs the following steps:
   * 1. Checks if a valid connector is available; if not, displays an error toast.
   * 2. Checks if the wallet is installed; if not, displays an error toast with an installation link.
   * 3. Attempts to connect using the provided onConnect callback.
   * 4. Closes the modal on a successful connection or displays an error toast on failure.
   *
   * @param {Connector | undefined} connector - The wallet connector.
   * @param {string | undefined} label - The label/name of the wallet.
   */
  const handleConnect = async (
    connector: Connector | undefined,
    label: string | undefined
  ) => {
    if (!connector) {
      toast.error(`${label || "Wallet"} is not available.`, {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }

    if (!isWalletInstalled(label || "")) {
      const installLink = getWalletInstallLink(label || "");
      toast.error(
        <div>
          {label} is not installed.{" "}
          <a
            href={installLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Click here to install
          </a>
        </div>,
        {
          position: "top-left",
          autoClose: 5000,
        }
      );
      return;
    }

    try {
      await onConnect(connector);
      onClose();
    } catch (error: unknown) {
      console.error("Connection error:", error);
      if (error instanceof Error) {
        toast.error(`Connection failed: ${error.message}`, {
          position: "top-left",
          autoClose: 5000,
        });
      } else {
        toast.error("Connection failed. Please try again.", {
          position: "top-left",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[#131313] rounded-[24px] shadow-lg w-full max-w-md duration-300"
      >
        <div className="flex justify-between items-center p-[16px_16px_16px_20px]">
          <h2 id="modal-title" className="text-sm text-white font-medium">
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-white hover:text-gray-300 transition-colors"
            aria-label="Close Modal"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-[8px] p-[8px_24px_24px_24px]">
          {walletOptions.map(({ label, icon }, index) => {
            // Retrieve the connector corresponding to this wallet option.
            const connector = getConnectorForWallet(label || "", connectors);
            // Check if the wallet is installed.
            const isInstalled = isWalletInstalled(label || "");
            return (
              <button
                key={index}
                className={`flex items-center justify-start w-full h-[56px] p-4 bg-[#1B1B1B] text-white gap-4 rounded-lg cursor-pointer transition-transform duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isInstalled ? "opacity-50" : ""
                }`}
                onClick={() => handleConnect(connector, label)}
                aria-label={`Connect with ${label}`}
              >
                {icon}
                <span className="font-medium">{label}</span>
                {!isInstalled && (
                  <span className="ml-auto text-xs text-yellow-500">
                    Not installed
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
