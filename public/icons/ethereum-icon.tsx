const EthereumIcon = ({
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
      d="M10 18.75a8.75 8.75 0 100-17.5 8.75 8.75 0 000 17.5z"
      fill="#627EEA"
    />
    <path d="M9.999 15.73v-3.01L6.25 10.547l3.749 5.182z" fill="#fff" />
    <path
      d="M9.999 3.75v4.428l3.749 1.673L9.999 3.75z"
      fill="#fff"
      fillOpacity={0.602}
    />
    <path d="M9.999 3.75L6.25 9.851l3.749-1.673V3.75z" fill="#fff" />
    <path
      d="M9.999 12.72v3.01l3.751-5.183-3.751 2.173z"
      fill="#fff"
      fillOpacity={0.602}
    />
    <path
      d="M9.999 12.024l3.749-2.173L9.999 8.18v3.845z"
      fill="#fff"
      fillOpacity={0.2}
    />
    <path
      d="M6.25 9.851l3.749 2.173V8.179L6.25 9.85z"
      fill="#fff"
      fillOpacity={0.602}
    />
  </svg>
);

export default EthereumIcon;
