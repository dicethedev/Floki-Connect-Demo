import React from "react";

const CoinbaseIcon = ({
  height = 40,
  width = 40,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.79 2.5h20.419c4.028 0 7.291 3.511 7.291 7.843v19.314c0 4.332-3.263 7.843-7.29 7.843H9.79c-4.027 0-7.29-3.511-7.29-7.843V10.343C2.5 6.01 5.763 2.5 9.79 2.5z"
      fill="#0052FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 7.57c6.866 0 12.43 5.564 12.43 12.43S26.867 32.43 20 32.43 7.57 26.867 7.57 20 13.133 7.57 20 7.57z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.938 16.027h6.123c.503 0 .91.44.91.98v5.985c0 .542-.408.98-.91.98h-6.123c-.504 0-.911-.44-.911-.98v-5.985c0-.54.409-.98.911-.98z"
      fill="#0052FF"
    />
  </svg>
);

export default CoinbaseIcon;
