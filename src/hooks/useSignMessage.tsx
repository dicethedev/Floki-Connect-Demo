import {
  signMessage,
  type SignMessageReturnType,
  type SignMessageErrorType,
} from "@wagmi/core";
import { walletConfig } from "../constants/config";
import { toast } from "react-toastify";
import { useState } from "react";

interface UseSignMessageReturn {
  sign: (message: string) => Promise<SignMessageReturnType | void>;
  isSigning: boolean;
}

const useSignMessage = (): UseSignMessageReturn => {
  const [isSigning, setIsSigning] = useState<boolean>(false);

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
      console.error("Error signing message:", signError);
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
