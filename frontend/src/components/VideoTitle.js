import React from "react";


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[vw] absolute text-white pt-[5%] p-8 ">
      <h1 className="text-2xl font-bold pl-1" > {title}</h1>

    </div>
  );
};

export default VideoTitle;
