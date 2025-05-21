import React from "react";


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[vw] absolute text-white pt-[18%] p-12 ml-2 mx-2 ">
      <h1 className="text-2xl font-bold pl-1" > {title}</h1>

    </div>
  );
};

export default VideoTitle;
