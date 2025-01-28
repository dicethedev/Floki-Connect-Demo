const CloseIcon = ({
  height = 24,
  width = 24,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10.94l3.713-3.713 1.06 1.06L13.061 12l3.712 3.713-1.06 1.06L12 13.06l-3.712 3.713-1.061-1.06L10.94 12 7.227 8.287l1.06-1.06L12 10.94z"
      fill="#9C9C9C"
    />
  </svg>
);

export default CloseIcon;
