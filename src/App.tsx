import { useEffect, useState } from "react";
import "./App.css";
import WalletModal from "./components/WalletModal";
import WalletInfo from "./components/WalletInfo";
import { useConnect, useAccount, Connector } from "wagmi";
import { toast } from "react-toastify";

function App() {
  const { connectAsync, connectors, isPending, isSuccess, isError } =
    useConnect();
  const { isConnected } = useAccount();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected && isSuccess) {
      setModalOpen(false);
      toast.success("Wallet connected successfully!", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  }, [isConnected, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to connect. Please try again.", {
        position: "top-left",
        autoClose: 2000,
      });
    }
  }, [isError]);

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector });
    } catch (err) {
      console.error("Error connecting:", err);
    }
  };

  const handleModalClose = () => {
    if (!isPending) {
      setModalOpen(false);
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
            {isPending ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
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
