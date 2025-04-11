import React, { useState, useEffect, useRef } from "react";
import { Topnav } from "./partials/Topnav";
import DropdownFilter from "./partials/DropdownFilter";
import axios from "./../utils/axios";
import VerticalCards from "./partials/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import loader from "../../public/820.gif";

const Popular = () => {
  const [type, setType] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const pageRef = useRef(1); // ✅ UseRef for better pagination handling

  const getPopular = async () => {
    if (loading) return; // ✅ Prevent multiple API calls at the same time

    setLoading(true);
    try {
      const { data } = await axios.get(`/${type}/popular?page=${pageRef.current}`);

      if (data.results.length === 0) {
        setHasMore(false); // ✅ Stop fetching if no more results
        return;
      }

      setPopular((prev) => {
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
      console.error("Error fetching popular data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPopular = async () => {
      setPopular([]); // ✅ Reset data when `type` changes
      setHasMore(true);
      pageRef.current = 1; // ✅ Reset pagination
      await getPopular();
    };

    fetchPopular();
  }, [type]);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Top Section */}
      <div id="scrollableDiv" className="px-8 w-full overflow-auto">
        <div className="h-[10vh] mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-line mr-2 cursor-pointer"></i>
            Popular
          </h1>
          <div className="w-full">
            <Topnav width="80%" />
          </div>
          <div className="flex gap-2">
            <DropdownFilter
              title="Type"
              options={["movie", "tv", "person"]}
              func={(e) => {
                setPopular([]);
                setHasMore(true);
                pageRef.current = 1;
                setType(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Infinite Scroll Section */}
        <InfiniteScroll
          dataLength={popular.length}
          next={getPopular}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center mt-10 w-full">
              <img src={loader} alt="Loading..." className="w-12 h-12" />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          <VerticalCards data={popular}  title={type} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Popular;
