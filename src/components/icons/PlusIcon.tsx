import React from "react";

const PlusIcon = (props) => {
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
        d="M8 13.25V2.75M2.75 8L13.25 8"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
