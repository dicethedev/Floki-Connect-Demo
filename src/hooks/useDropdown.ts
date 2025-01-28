import { useRef, useState, useCallback, useEffect } from "react";

interface UseDropdownProps {
  initialState?: boolean;
}

interface UseDropdownReturn {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLUListElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  handleMouseLeave: () => void;
}

export const useDropdown = ({
  initialState = false,
}: UseDropdownProps = {}): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickInsideDropdown =
      dropdownRef.current?.contains(event.target as Node) ||
      buttonRef.current?.contains(event.target as Node);

    if (!isClickInsideDropdown) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const events: Array<keyof DocumentEventMap> = [
      "pointerdown",
      "pointerup",
      // "pointermove",
    ];
    events.forEach((event) =>
      document.addEventListener(event, handleClickOutside as EventListener)
    );

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleClickOutside as EventListener)
      );
    };
  }, [handleClickOutside]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    dropdownRef,
    buttonRef,
    handleMouseLeave,
  };
};
