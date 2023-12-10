import React from "react";

const CheckmarkIcon = (props) => {
  return (
    <svg
      className={props.className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4.75L7.80311 11.5459C7.36131 12.1236 7.14041 12.4125 6.87231 12.5134C6.6375 12.6018 6.37804 12.5986 6.14542 12.5046C5.87982 12.3973 5.66594 12.1032 5.23816 11.515L3.04541 8.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckmarkIcon;
