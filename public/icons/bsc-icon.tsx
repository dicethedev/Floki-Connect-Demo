import React from "react";

const BinanceSmartChainIcon = ({
  height = 20,
  width = 21,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x={0.5}
      width={20}
      height={20}
      rx={10}
      fill="#F0B90B"
      fillOpacity={0.2}
    />
    <path
      d="M6.686 10l-1.582 1.581-1.582-1.58 1.582-1.582L6.686 10zm3.837-3.84l2.709 2.712 1.581-1.581L10.523 3 6.232 7.29l1.581 1.58 2.71-2.71zm5.42 2.259L14.362 10l1.58 1.581 1.58-1.58-1.58-1.582zm-5.42 5.42l-2.71-2.71-1.581 1.58L10.522 17l4.291-4.29-1.581-1.58-2.71 2.71zm0-2.258l1.58-1.58-1.58-1.582L8.94 10l1.582 1.581z"
      fill="#F0B90B"
    />
  </svg>
);

export default BinanceSmartChainIcon;
