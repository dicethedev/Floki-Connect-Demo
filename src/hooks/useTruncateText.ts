/**
 * Custom hook for truncating text
 *
 * This hook truncates a given text string by keeping a specified number of
 * characters at the start and end, replacing the middle with an ellipsis.
 *
 * @param {string} text - The text to be truncated
 * @param {number} [startChars=4] - Number of characters to keep at the start
 * @param {number} [endChars=4] - Number of characters to keep at the end
 * @returns {string} The truncated text
 *
 * @example
 * // Returns "0x1A...89B3"
 * const truncated = useTruncateText("0x1A3F...89B3", 4, 4);
 */
const useTruncateText = (
  text: string,
  startChars: number = 4,
  endChars: number = 4
): string => {
  // If the text is shorter than or equal to the sum of start and end characters,
  // return the original text without truncation
  if (text.length <= startChars + endChars) {
    return text;
  }

  // Truncate the text and return the result
  return `${text.substring(0, startChars)}...${text.substring(
    text.length - endChars
  )}`;
};

export default useTruncateText;
