import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Props for the useDropdown hook
 */
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

/**
 * Custom hook for managing dropdown state and behavior
 *
 * This hook provides functionality for:
 * - Managing the open/closed state of a dropdown
 * - Handling clicks outside the dropdown to close it
 * - Providing refs for the dropdown and its toggle button
 * - Handling mouse leave events
 *
 * @param {UseDropdownProps} props - The props for the hook
 * @returns {UseDropdownReturn} An object containing the dropdown state and handlers
 */
export const useDropdown = ({
  initialState = false,
}: UseDropdownProps = {}): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  // Refs for the dropdown and its toggle button
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Handler for clicks outside the dropdown
   * Closes the dropdown if the click is outside both the dropdown and its toggle button
   */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const isClickInsideDropdown =
      dropdownRef.current?.contains(event.target as Node) ||
      buttonRef.current?.contains(event.target as Node);

    if (!isClickInsideDropdown) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const events: Array<keyof DocumentEventMap> = ["pointerdown", "pointerup"];
    events.forEach((event) =>
      document.addEventListener(event, handleClickOutside as EventListener)
    );

    // Cleanup function to remove event listeners
    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, handleClickOutside as EventListener)
      );
    };
  }, [handleClickOutside]);

  /**
   * Handler for mouse leave events
   * Closes the dropdown when the mouse leaves
   */
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
