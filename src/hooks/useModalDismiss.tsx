import { useEffect, useRef } from "react";

type Handler = () => void;

/**
 * Custom hook for modal dismissal
 *
 * This hook provides functionality to dismiss a modal when:
 * 1. The user clicks outside the modal
 * 2. The user presses the Escape key
 *
 * @template T - The type of HTML element that the ref will be attached to
 * @param {Handler} handler - The function to be called when the modal should be dismissed
 * @returns {React.RefObject<T>} A ref object to be attached to the modal element
 */
export const useModalDismiss = <T extends HTMLElement>(handler: Handler) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    /**
     * Handles clicks outside the modal
     * @param {MouseEvent} event - The mouse event
     */
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the modal, call the handler
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    /**
     * Handles the Escape key press
     * @param {KeyboardEvent} event - The keyboard event
     */
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handler]);

  return ref;
};
