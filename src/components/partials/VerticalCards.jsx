import React from "react";
import { Link } from "react-router-dom";
import VerticalSkeletonLoader from "../VerticalSkeletonLoader";

const VerticalCards = ({ data  ,title}) => {


  return (
    <div className="w-full flex mt-4 flex-wrap justify-between gap-x-4 gap-y-10 px-6">
      {data.length === 0 ? (
        <VerticalSkeletonLoader width="20%" height="270px" count={8} />
      ) : (
        data.map((d) => (
          <Link
            to={`/${d.media_type || title}/details/${d.id}`}
            className="w-full  lg:w-[15vw] relative  h-[50vh] rounded"
            key={d.id}
          >
            <img
              className="w-full rounded h-[90%] object-cover shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"
              src={`https://image.tmdb.org/t/p/original/${
                d.poster_path || d.backdrop_path || d.profile_path
              } || `}
              alt={d.name || d.title || "Movie Poster"}
            />
            <h1 className="text-zinc-300 font-semibold text-center">
              {d.name || d.original_name || d.original_title || d.title}
            </h1>
            {d.vote_average && (
              <div className="w-10 h-10 bg-orange-500 text-white font-bold p-2 rounded-full shadow-lg shadow-orange-500/50 border-2 border-white absolute top-[70%] right-[-10%] flex items-center  justify-center rounded-full">
                {(d.vote_average * 10).toFixed()} <sup>%</sup>
              </div>
            )}
          </Link>
        ))
      )}
    </div>
  );
};

export default VerticalCards;
