import React from "react";
import { RotatingLines } from "react-loader-spinner";

const NotFoud = () => {
  return (
    <div className="bg-black/80 lg:text-4xl text-lg h-screen center-col w-[100vw] text-white font-semibold">
      Not Found !
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default NotFoud;
