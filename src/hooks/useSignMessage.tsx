import {
  signMessage,
  type SignMessageReturnType,
  type SignMessageErrorType,
} from "@wagmi/core";
import { walletConfig } from "../constants/config";
import { toast } from "react-toastify";
import { useState } from "react";

//***Interface representing the return value of the `useSignMessage` hook.
interface UseSignMessageReturn {
  sign: (message: string) => Promise<SignMessageReturnType | void>;
  isSigning: boolean;
}

/**
 * Custom hook to sign messages using the wallet's signing capability.
 *
 * This hook wraps the `signMessage` function from `@wagmi/core` and manages the signing state.
 * It uses the wallet configuration from `walletConfig` and provides user feedback via toast notifications.
 *
 * @returns {UseSignMessageReturn} An object containing:
 *  - `sign`: A function to sign a given message.
 *  - `isSigning`: A boolean flag indicating if a signing operation is in progress.
 */
const useSignMessage = (): UseSignMessageReturn => {
  const [isSigning, setIsSigning] = useState<boolean>(false);

  /**
   * Signs the provided message using the wallet configuration.
   *
   * This function updates the `isSigning` state to indicate the signing process,
   * attempts to sign the message using `@wagmi/core`'s signMessage, and displays
   * success or error toast notifications based on the outcome.
   *
   * @param message - The message that needs to be signed.
   * @returns A promise that resolves to the signature if successful, or void if an error occurs.
   */
  const sign = async (
    message: string
  ): Promise<SignMessageReturnType | void> => {
    setIsSigning(true);
    try {
      const signature: SignMessageReturnType = await signMessage(walletConfig, {
        message,
      });
      // console.log("Error signing message:", signature);
      toast.success(`Message signed successfully`, {
        position: "top-left",
        autoClose: 3000,
      });
      return signature;
    } catch (error) {
      const signError = error as SignMessageErrorType;
      // console.error("Error signing message:", signError);
      const errorMessage =
        signError?.message ||
        "An unknown error occurred while signing the message.";

      toast.error(`Failed to sign the message: ${errorMessage}`, {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setIsSigning(false);
    }
  };

  return { sign, isSigning };
};

export default useSignMessage;
