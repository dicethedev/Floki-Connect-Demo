import { useEffect, useState } from "react";
import "./App.css";
import WalletModal from "./components/WalletModal";
import WalletInfo from "./components/WalletInfo";
import { useConnect, useAccount, Connector } from "wagmi";
import { toast } from "react-toastify";

/**
 * App Component
 *
 * This is the main component of the application. It handles the wallet
 * connection process and renders either a connect button or wallet info
 * based on the connection state.
 */

function App() {
  const { connectAsync, connectors, isPending, isSuccess, isError } =
    useConnect();
  const { isConnected } = useAccount();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  //***Effect for handling successful wallet connection
  useEffect(() => {
    if (isConnected && isSuccess) {
      setModalOpen(false);
      toast.success("Wallet connected successfully!", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  }, [isConnected, isSuccess]);

  //***Effect for handling connection errors
  useEffect(() => {
    if (isError) {
      toast.error("Failed to connect. Please try again.", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  }, [isError]);

  /**
   * Handles the wallet connection process
   * @param connector - The wallet connector to use for the connection
   */
  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
    } catch (err) {
      console.error("Error connecting:", err);
      // Note: Error toasts are handled by the useEffect hook
    }
  };

  /**
   * Handles closing of the wallet connection modal
   * Prevents closing while connection is pending
   */
  const handleModalClose = () => {
    if (!isPending) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        {!isConnected ? (
          // Render connect button if wallet is not connected
          <button
            className="px-4 py-2 bg-[#131313] text-white rounded-[10px] hover:bg-[#131313] cursor-pointer"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen ? "true" : "false"}
            aria-label="Open Wallet Connection Modal"
          >
            {isPending ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          // Render wallet info if wallet is connected
          <WalletInfo />
        )}
      </div>

      {/* --------- Connect Wallet Modal options ----------- */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConnect={handleConnect}
        connectors={connectors}
      />
    </>
  );
}

export default App;
