import React from "react";

const Button = ({ color01, color02, value, btnAction }) => {
  return (
    <button
      onClick={btnAction}
      className="btn"
      style={{
        background: color02
          ? `linear-gradient(to right, ${color01}, ${color02})`
          : color01,
      }}
    >
      {value}
    </button>
  );
};

export default Button;
