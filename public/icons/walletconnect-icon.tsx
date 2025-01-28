const WalletconnectIcon = ({
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
    <g clipPath="url(#clip0_193_237)">
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={40}
        height={40}
      >
        <path d="M0 0h40v40H0V0z" fill="#fff" />
      </mask>
      <g mask="url(#a)">
        <path
          d="M20 37.5c9.665 0 17.5-7.835 17.5-17.5S29.665 2.5 20 2.5 2.5 10.335 2.5 20 10.335 37.5 20 37.5z"
          fill="#3396FF"
        />
        <path
          d="M12.252 14.896c4.28-4.172 11.217-4.172 15.496 0l.515.503a.525.525 0 010 .755l-1.762 1.718a.279.279 0 01-.387 0l-.709-.69c-2.985-2.912-7.825-2.912-10.81 0l-.76.74a.279.279 0 01-.387 0l-1.761-1.719a.525.525 0 010-.755l.565-.552zm19.14 3.553l1.568 1.53a.525.525 0 010 .755l-7.07 6.894a.558.558 0 01-.775 0l-5.018-4.893a.14.14 0 00-.194 0l-5.017 4.893a.558.558 0 01-.775 0l-7.07-6.894a.525.525 0 010-.756l1.568-1.529a.558.558 0 01.774 0l5.018 4.893a.14.14 0 00.194 0l5.018-4.893a.558.558 0 01.774 0l5.018 4.893a.14.14 0 00.194 0l5.018-4.893a.558.558 0 01.775 0z"
          fill="#fff"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_193_237">
        <path fill="#fff" d="M0 0H40V40H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default WalletconnectIcon;
