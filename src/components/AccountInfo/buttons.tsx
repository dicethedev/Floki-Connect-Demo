import { ReactNode } from "react";
import { DisconnectIcon } from "../../../public/icons";

export interface ButtonProps {
  label: string;
  icon: ReactNode | null;
  bgColor: string;
  textColor: string;
}

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
