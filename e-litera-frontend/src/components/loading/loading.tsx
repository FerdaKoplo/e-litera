import React, { useState, useEffect } from "react";

const Loading = () => {

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-white dark:bg-black">
      {/* Animated Book */}
      <div className="relative w-32 h-40 border-4 border-gray-800 dark:border-violet-400 rounded-md shadow-lg overflow-hidden ">
        {/* Background Book */}
        <div className="absolute inset-0 bg-white" />
        {/* Textures */}
        <div className="absolute inset-0 flex flex-col justify-center z-30 p-3 animate-glitch">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-2 bg-gray-200 rounded my-1"></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-violet-600 to-purple-500 z-20  animate-g" />
        <div className="absolute inset-0 bg-purple-400 z-10 h-3/4  animate-glitch" />
      </div>
    </div>
  );
};

export default Loading;
