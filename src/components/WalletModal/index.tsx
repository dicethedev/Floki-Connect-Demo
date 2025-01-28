import { toast } from "react-toastify";
import { CloseIcon } from "../../../public/icons";
import { walletOptions } from "./walletOptions";
import { Connector } from "wagmi";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (connector: Connector) => void;
  connectors: readonly Connector[];
}

const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  connectors,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div
        className="bg-[#131313] rounded-[24px] shadow-lg w-full max-w-md duration-300"
        aria-labelledby="modal-title"
      >
        {/* ------ Header ------ */}
        <div className="flex justify-between items-center p-[16px_16px_16px_20px]">
          <h2 id="modal-title" className="text-sm text-white font-medium">
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer"
            aria-label="Close Modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* --------- Wallet Options ----------- */}
        <div className="flex flex-col gap-[8px] p-[8px_24px_24px_24px]">
          {connectors.length === 0 ? (
            <p className="text-center text-white">
              No wallet connectors available.
            </p>
          ) : (
            walletOptions.map(({ label, icon }, i) => {
              let connector;
              switch (label) {
                case "MetaMask":
                  connector = connectors[1]; // Metamask Wallet connector
                  break;
                case "Coinbase Wallet":
                  connector = connectors[2]; // Coinbase Wallet connector
                  break;
                case "Phantom":
                  connector = connectors[3]; // Phantom connector
                  break;
                case "WalletConnect":
                  connector = connectors[4]; // WalletConnect connector
                  break;
                default:
                  connector = connectors[0]; // Fallback to Injected Wallet on the browser
              }

              return (
                <button
                  key={i}
                  className="flex items-center justify-start w-full h-[56px] p-4 bg-[#1B1B1B] text-white gap-4 rounded-lg cursor-pointer transition-transform duration-200 transform hover:scale-[1.02]"
                  onClick={() => {
                    try {
                      onConnect(connector);
                      onClose();
                    } catch (error: unknown) {
                      toast.error("Connection failed. Please try again.", {
                        position: "top-left",
                        autoClose: 2000,
                      });
                    }
                  }}
                  aria-label={`Connect with ${label}`}
                >
                  {icon}
                  <span className="font-medium">{label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
