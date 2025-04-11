import React from "react";

const SkeletonLoader = ({ count = 5 ,width, height }) => {
  return (
    <div className="  flex gap-4 ">
      {Array(count)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className=" mr-5 mb-6 bg-zinc-800 rounded-lg p-2 animate-pulse"
            style={{minWidth: width, minHeight: height }}
          >
            {/* Image Skeleton */}
            <div className="h-[70%] w-full bg-zinc-700 rounded-md"></div>

            {/* Title Skeleton */}
            <div className="h-4 w-3/4 bg-zinc-600 rounded mt-3"></div>

            {/* Description Skeleton */}
            <div className="h-3 w-full bg-zinc-700 rounded mt-2"></div>
            <div className="h-3 w-5/6 bg-zinc-700 rounded mt-1"></div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
