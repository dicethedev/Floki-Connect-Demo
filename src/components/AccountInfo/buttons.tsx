import { ReactNode } from "react";
import { DisconnectIcon } from "../../../public/icons";

/**
 * Interface for defining the properties of a button option
 *
 **/
export interface ButtonProps {
  label: string;
  icon: ReactNode | null;
  bgColor: string;
  textColor: string;
}

/**
 * Array of button options available for wallet actions.
 *
 * This array defines the buttons that are rendered within a wallet-related dropdown or menu.
 * Each button specifies its label, icon (if any), background color, and text color.
 *
 */

export const buttons: ButtonProps[] = [
  {
    label: "Sign Message",
    icon: null,
    bgColor: "bg-[#131313]",
    textColor: "text-white",
  },
  {
    label: "Disconnect",
    icon: <DisconnectIcon />,
    bgColor: "bg-white",
    textColor: "text-[#131313]",
  },
];
