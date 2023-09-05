import React from "react";
export default function PageNotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img
        className="w-75 h-75"
        src={require("./pageNotFound.png")}
        height="400px"
      />
    </div>
  );
}
