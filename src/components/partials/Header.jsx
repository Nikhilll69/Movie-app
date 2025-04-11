import React from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";

const Header = ({ data }) => {
 

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })  60% 20%/cover no-repeat`,
      }}
      className="w-full h-[60vh] flex flex-col justify-end pb-[3%] pl-[4%] rounded"
    >
      <h1 className="text-4xl text-white font-black">
        {(
          data.name ||
          data.original_name ||
          data.original_title ||
          data.title
        )?.toUpperCase()}
      </h1>
      <p className="text-white w-[50%] mt-2">{data.overview?.slice(0, 180)}</p>
      <div className="mt-4 text-white flex item-center">
        <i className=" text-purple-300 text-xl ri-megaphone-fill mr-1 "></i>{" "}
        {data.release_date || "Unknown"}
        <i className="text-purple-300 text-xl ri-album-fill ml-6 mr-1 uppercase"></i>
        {data.media_type?.toUpperCase()}
      </div>
      <Link className="text-white flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-[10vw] h-[7vh] font-bold mt-4 rounded">
        Wacth Now <i class="text-white ri-google-play-fill ml-3"></i>
      </Link>
    </div>
  );
};

export default Header;
