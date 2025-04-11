import React from "react";
import SkeletonLoader from "../SkeletonLoader"; 
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    
    <div className=" flex overflow-x-auto overflow-y-hidden p-2 mb-10">

        {data.length === 0 ? (
        
          <SkeletonLoader width="90%" height="300px" count={5} />
        ) : (
          data.map((d) => (
            <Link to={`/${d.media_type}/details/${d.id}`} key={d.id} className="min-w-[24%] h-[35vh] mr-5 mb-6 bg-zinc-900 rounded">
              <img
                className="h-[60%] w-full object-cover rounded"
                src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`}
                alt={d.title || d.name}
              />
              <p className="text-zinc-200 text-[15px] ml-2 mt-2 font-semibold">
                {(d.name || d.original_name || d.original_title || d.title)?.toUpperCase()}
              </p>
              <p className="text-zinc-400 text-sm ml-2 mt-1">
                {d.overview?.slice(0, 60)}...{" "}
                <span className="text-zinc-100 font-semibold">more</span>
              </p>
            </Link>
          ))
        )}
      </div>
  );
};

export default HorizontalCards;
