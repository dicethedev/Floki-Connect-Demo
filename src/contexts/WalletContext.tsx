import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAccount, useDisconnect } from "wagmi";
import useSignMessage from "../hooks/useSignMessage";
import { toast } from "react-toastify";

/**
 * Interface defining the shape of the WalletContext
 */
interface WalletContextType {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  hasSignedMessage: boolean;
  isSigning: boolean;
  disconnecting: boolean;
  disconnectWallet: () => Promise<void>;
  signMessage: () => Promise<void>;
  resetSignatureState: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * WalletProvider Component
 *
 * This component provides wallet-related functionality to its children components.
 * It manages wallet connection, message signing, and disconnection processes.
 */
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { sign, isSigning } = useSignMessage();
  const [hasSignedMessage, setHasSignedMessage] = useState<boolean>(false);
  const [disconnecting, setDisconnecting] = useState<boolean>(false);

  //****Reset the signature state
  const resetSignatureState = () => {
    setHasSignedMessage(false);
  };

  //****Sign a message to prove wallet ownership
  const signMessage = useCallback(async () => {
    // Preventing duplicate sign requests if already signed or signing is in progress.
    if (hasSignedMessage || isSigning) return;

    const message =
      "Sign this message to prove you own this wallet and proceed.";
    try {
      await sign(message);
      setHasSignedMessage(true);
    } catch (error) {
      console.error("Error signing message:", error);
      toast.error("Error signing message.", {
        position: "top-left",
        autoClose: 3000,
      });
    }
  }, [hasSignedMessage, isSigning, sign]);

  //****Disconnect the wallet
  const disconnectWallet = async () => {
    if (disconnecting) return;
    setDisconnecting(true);

    try {
      await disconnectAsync();
      setHasSignedMessage(false);
      toast.success("Disconnected successfully!", {
        position: "top-left",
        autoClose: 3000,
      });
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

  useEffect(() => {
    if (isConnected && !hasSignedMessage) {
      signMessage();
    }
  }, [isConnected, hasSignedMessage, signMessage]);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        hasSignedMessage,
        disconnectWallet,
        signMessage,
        isSigning,
        disconnecting,
        resetSignatureState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

/**
 * Custom hook to use the wallet context
 *
 * @throws {Error} If used outside of a WalletProvider
 * @returns {WalletContextType} The wallet context
 */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
