import { useEffect, useState } from "react";
import "./App.css";
import WalletModal from "./components/WalletModal";
import NetworkSwitcher from "./components/NetworkSwitcher";
import { useConnect, useAccount, Connector } from "wagmi";
import { toast } from "react-toastify";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

function App() {
  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("idle");

  useEffect(() => {
    if (isConnected && connectionStatus === "connecting") {
      setConnectionStatus("connected");
      setModalOpen(false);
      toast.success("Wallet connected successfully!", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  }, [isConnected, connectionStatus]);

  const handleConnect = async (connector: Connector) => {
    try {
      setConnectionStatus("connecting");
      await connectAsync({ connector });
      // The modal will be closed in the useEffect when isConnected becomes true
    } catch (err) {
      console.error("Error connecting:", err);
      setConnectionStatus("error");
      toast.error("Failed to connect. Please try again.", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  };

  const handleModalClose = () => {
    if (connectionStatus !== "connecting") {
      setModalOpen(false);
      setConnectionStatus("idle");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        {!isConnected ? (
          <button
            className="px-4 py-2 bg-[#131313] text-white rounded-[10px] hover:bg-[#131313] cursor-pointer"
            onClick={() => setModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen ? "true" : "false"}
            aria-label="Open Wallet Connection Modal"
          >
            Connect Wallet
          </button>
        ) : (
          <NetworkSwitcher walletAddress={address} />
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
