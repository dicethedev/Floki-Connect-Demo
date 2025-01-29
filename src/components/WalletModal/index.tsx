import type React from "react";
import { toast } from "react-toastify";
import { CloseIcon } from "../../../public/icons";
import { walletOptions } from "./walletOptions";
import type { Connector } from "wagmi";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (connector: Connector) => Promise<void>;
  connectors: readonly Connector[];
}

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  connectors,
}) => {
  if (!isOpen) return null;

  const getConnectorForWallet = (walletName: string): Connector | undefined => {
    switch (walletName.toLowerCase()) {
      case "metamask":
        return connectors.find((c) => c.name === "MetaMask");
      case "coinbase wallet":
        return connectors.find((c) => c.name === "Coinbase Wallet");
      case "phantom":
        return connectors.find((c) => c.name === "Phantom");
      case "walletconnect":
        return connectors.find((c) =>
          c.name.toLowerCase().includes("walletconnect")
        );
      default:
        return undefined;
    }
  };

  const isWalletInstalled = (walletName: string): boolean => {
    switch (walletName.toLowerCase()) {
      case "metamask":
        return (
          typeof window !== "undefined" &&
          typeof window.ethereum !== "undefined" &&
          window.ethereum.isMetaMask
        );
      case "coinbase wallet":
        return (
          typeof window !== "undefined" &&
          typeof window.ethereum !== "undefined" &&
          window.ethereum.isCoinbaseWallet
        );
      case "phantom":
        return (
          typeof window !== "undefined" && typeof window.solana !== "undefined"
        );
      case "walletconnect":
        return connectors.some((c) =>
          c.name.toLowerCase().includes("walletconnect")
        );
      default:
        return false;
    }
  };

  const getWalletInstallLink = (walletName: string): string => {
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

  const handleConnect = async (
    connector: Connector | undefined,
    label: string | undefined
  ) => {
    console.log("Attempting to connect with:", label, connector);

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
      <div className="bg-[#131313] rounded-[24px] shadow-lg w-full max-w-md duration-300">
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
            const connector = getConnectorForWallet(label || "");
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
