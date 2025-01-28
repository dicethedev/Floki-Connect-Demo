const ArrowDownIcon = ({
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
      d="M10 10.879l3.713-3.712 1.06 1.06L10 13 5.227 8.227l1.06-1.06L10 10.879z"
      fill="#131313"
    />
  </svg>
);

export default ArrowDownIcon;
