import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="w-full h-2 bg-gray-300 rounded-full">
      <div
        className="h-full bg-blue-500 rounded-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
