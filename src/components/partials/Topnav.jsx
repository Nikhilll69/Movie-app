import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "./../../../public/no-camera.png";

export const Topnav = ({width}) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearchResults(data.results);
     
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);


  return (
    <div className=" h-[8vh] ml-[15%] mt-4 relative  flex ">
      <i class="ri-search-line  text-zinc-400  text-xl"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="h-6 w-[30vw] mx-8 text-zinc-200 p-4 outline-none bg-transparent"
        type="text "
        placeholder="Search...."
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          class="ri-close-line text-zinc-400 text-2xl"
        ></i>
      )}
      <div className="absolute z-[100] h-[50vh] top-[90%] ml-8 overflow-auto" style={{width:width}}>
        {searchResults.map((s, i) => (
          <Link
          to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-400  mb-1 text-white font-semibold  w-full p-4 rounded flex justify-start items-center"
          >
            <img className="h-[8vh] w-[8vh] mr-5 rounded object-cover " src={ s.profile_path || s.backdrop_path  ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path }` : noimage }alt="title" />
            <span>
              {s.name || s.original_name || s.original_title || s.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
