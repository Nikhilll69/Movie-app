import React from "react";

const VerticalSkeletonLoader = ({ count = 5, width = "15vw", height = "50vh" }) => {
  return (
    <div className="w-full flex flex-wrap justify-between gap-x-4 gap-y-10 px-2">
      {Array(count)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-lg p-2 animate-pulse"
            style={{ minWidth: width, minHeight: height }}
          >
            {/* Image Skeleton */}
            <div className="h-[90%] w-full bg-zinc-700 rounded-md shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"></div>

            {/* Title Skeleton */}
            <div className="h-4 w-3/4 bg-zinc-600 rounded mt-3 mx-auto"></div>
          </div>
        ))}
    </div>
  );
};

export default VerticalSkeletonLoader;
