import React from "react";
import { Link } from "react-router-dom";

export const Sidenav = () => {
  return (
    <div className="w-[20vw] h-full border-r-1 border-zinc-400 p-5">
      <h1 className="text-2xl  font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        <i class="ri-google-play-fill"></i> STREAM SAGE
      </h1>
      <nav className=" flex flex-col text-zinc-300 gap-1  font-lg ">
        <h1 className="font-bold text-lg text-white py-4 px-8 mt-2 ">
          New Feeds
        </h1>
        <Link to="/popular" className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i class="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link to="/trending" className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link to="/movies" className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i className="ri-movie-2-ai-fill mr-2"></i>Movies
        </Link>
        <Link to="tvshows" className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i className="ri-tv-2-fill mr-2"></i>TV Shows
        </Link>
        <Link to="/people" className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded mb-4">
          <i className="ri-team-fill  mr-2"></i>People
        </Link>

        <hr />
        <h1 className="text-lg text-white mt-2 p-2 font-bold ">
          WebSite Information
        </h1>
        <Link className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i className="ri-phone-fill mr-2"></i>Contact Us
        </Link>
        <Link className="hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white px-6 py-2 duration-400 rounded">
          <i className="ri-map-pin-user-fill mr-2"></i>About Us
        </Link>
      </nav>
    </div>
  );
};
