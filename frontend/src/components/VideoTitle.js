import React from "react";


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[vw] absolute text-white pt-[18%] p-12">
      <h1 className="text-3xl font-bold pt-30" > {title}</h1>
   
    </div>
  );
};

export default VideoTitle;
