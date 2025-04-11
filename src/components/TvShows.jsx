import React, { useState, useEffect, useRef } from "react";
import { Topnav } from "./partials/Topnav";
import DropdownFilter from "./partials/DropdownFilter";
import axios from "../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import loader from "../../public/820.gif";

const TvShows = () => {
  const [type, setType] = useState("airing_today");
  const [TvShows, setTvShows] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const pageRef = useRef(1); // ✅ UseRef for better pagination handling

  const getShows = async () => {
    if (loading) return; // ✅ Prevent multiple API calls at the same time

    setLoading(true);
    try {
      const { data } = await axios.get(`/tv/${type}?page=${pageRef.current}`);

      if (data.results.length === 0) {
        setHasMore(false); // ✅ Stop fetching if no more results
        return;
      }

      setTvShows((prev) => {
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
    const fetchshows = async () => {
      setTvShows([]); // ✅ Reset data when `type` changes
      setHasMore(true);
      pageRef.current = 1; // ✅ Reset pagination
      await getShows();
    };

    fetchshows();
  }, [type]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Top Section */}
      <div id="scrollableDiv" className="px-8 w-full overflow-auto">
        <div className="h-[10vh] mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-line mr-1 cursor-pointer"></i>
           TvShows
          </h1>
          <div className="w-full">
            <Topnav width="80%" />
          </div>
          <div className="flex gap-2">
            <DropdownFilter
              title="Type"
              options={["top_rated", "airing_today", "popular","on_the_air"]}
              func={(e) => {
                setTvShows([]);
                setHasMore(true);
                pageRef.current = 1;
                setType(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Infinite Scroll Section */}
        <InfiniteScroll
          dataLength={TvShows.length}
          next={getShows}
          hasMore={hasMore}
                    loader={
                      <div className="flex justify-center items-center mt-10 w-full">
                        <img src={loader} alt="Loading..." className="w-12 h-12" />
                      </div>
                    }
          scrollableTarget="scrollableDiv"
        >
          <VerticalCards data={TvShows} title="tv" />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TvShows;
