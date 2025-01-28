import React from "react";

const DisconnectIcon = ({
  height = 20,
  width = 20,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 14.5h1.5V16h9V4h-9v1.5H4V3.25a.75.75 0 01.75-.75h10.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H4.75a.75.75 0 01-.75-.75V14.5zm1.5-5.25h5.25v1.5H5.5V13l-3.75-3L5.5 7v2.25z"
      fill="#131313"
    />
  </svg>
);

export default DisconnectIcon;
