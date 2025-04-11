import React, { useState, useEffect, useRef } from "react";
import { Topnav } from "./partials/Topnav";
import DropdownFilter from "./partials/DropdownFilter";
import axios from "./../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import loader from "../../public/820.gif";

const Movies = () => {
  const [type, setType] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const pageRef = useRef(1); // ✅ UseRef for better pagination handling

  const getMovies = async () => {
    if (loading) return; // ✅ Prevent multiple API calls at the same time

    setLoading(true);
    try {
      const { data } = await axios.get(`/movie/${type}?page=${pageRef.current}`);

      if (data.results.length === 0) {
        setHasMore(false); // ✅ Stop fetching if no more results
        return;
      }

      setMovies((prev) => {
        const uniqueResults = [...prev, ...data.results].reduce((acc, curr) => {
          if (!acc.some((item) => item.id === curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, []);
        return uniqueResults;
      });

      pageRef.current += 1; // ✅ Increment page correctly
    } catch (error) {
      console.error("Error fetching movies data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setMovies([]); // ✅ Reset data when `type` changes
      setHasMore(true);
      pageRef.current = 1; // ✅ Reset pagination
      await getMovies();
    };

    fetchMovies();
  }, [type]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Top Section */}
      <div id="scrollableDiv" className="px-8 w-full overflow-auto">
        <div className="h-[10vh] mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 cursor-pointer"></i>
            Movies
          </h1>
          <div className="w-full">
            <Topnav width="80%" />
          </div>
          <div className="flex gap-2">
            <DropdownFilter
              title="Type"
              options={["top_rated", "upcoming", "popular","now_playing"]}
              func={(e) => {
                setMovies([]);
                setHasMore(true);
                pageRef.current = 1;
                setType(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Infinite Scroll Section */}
        <InfiniteScroll
          dataLength={movies.length}
          next={getMovies}
          hasMore={hasMore}
                   loader={
                     <div className="flex justify-center items-center mt-10 w-full">
                       <img src={loader} alt="Loading..." className="w-12 h-12" />
                     </div>
                   }
          scrollableTarget="scrollableDiv"
        >
          <VerticalCards data={movies} title="movie" />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Movies;
