import React, { useState, useEffect } from "react";
import { Topnav } from "./partials/Topnav";
import DropdownFilter from "./partials/DropdownFilter";
import axios from "./../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import loader from "../../public/820.gif";

const Trending = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate=useNavigate()

  const getTrendings = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${selectedGenre}/${selectedPeriod}?page=${page}`
      );

      if (data.results.length === 0) {
        setHasMore(false); // Stop fetching if no more results
        return;
      }

      setTrending((prev) => {
        const uniqueResults = [...prev, ...data.results].reduce((acc, curr) => {
          if (!acc.find((item) => item.id === curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, []);
        return uniqueResults;
      });

      setPage((prev) => prev + 1); 
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  useEffect(() => {
    setTrending([]); // Reset trending data 
    setPage(1);
    setHasMore(true);
    getTrendings();
  }, [selectedGenre, selectedPeriod]);

  return (
    <div className="w-screen min-h-screen  flex flex-col">
      {/* Top Section */}
      <div
        id="scrollableDiv"
        className="px-8 w-full overflow-auto"
      >
      <div className="h-[10vh] mt-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400"><i onClick={()=> navigate(-1)} className="ri-arrow-left-line mr-2 "></i>Trending</h1>
        <div className="w-full">
          <Topnav width="80%" />
        </div>
       <div className="flex gap-2">
       <DropdownFilter
          title="Period"
          options={["day", "week"]}
          func={(e) => setSelectedPeriod(e.target.value)}
          
        />
         <DropdownFilter
          title="genre"
          options={["all", "tv", "movie"]}
          func={(e) => setSelectedGenre(e.target.value)}
          
        />
       </div>
      </div>
      

      
        <InfiniteScroll
          dataLength={trending.length}
          next={getTrendings}
          hasMore={hasMore}
                loader={
                  <div className="flex justify-center items-center mt-10 w-full">
                    <img src={loader} alt="Loading..." className="w-12 h-12" />
                  </div>
                }
          scrollableTarget="scrollableDiv"
        >
          <VerticalCards data={trending} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
