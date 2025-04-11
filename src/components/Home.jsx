import React, { useState ,useEffect} from 'react'
import { Sidenav } from './partials/Sidenav'
import { Topnav } from './partials/Topnav'
import axios from "./../utils/axios";
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import DropdownFilter from './partials/DropdownFilter';
import SkeletonLoader from "../components/SkeletonLoader";

export const Home = () => {

  const [wallpaper,setWallpaper]=useState([]);
  const [trending, settrending] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [selectedGenre, setSelectedGenre] = useState("all");
  
  const getWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
     
      setWallpaper(data.results[(Math.random()*data.results.length).toFixed()]);
     
    } catch (error) {
      console.log("error :", error);
    }
  };
 
  
  const gettrendings = async () => {
    try {
      const { data } = await axios.get(`/trending/${selectedGenre}/${selectedPeriod}`);
      
      settrending(data.results);
     
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    settrending([]); // Force empty state to trigger Skeleton
    gettrendings();
    // Delay loading by 3 seconds
  }, [selectedGenre, selectedPeriod]);
  useEffect(() => {
    if (wallpaper.length === 0) getWallpapers();
  }, []);

  return   (
    <>
    <Sidenav/>
    <div className='w-[80vw] h-full overflow-auto overflow-x-hidden'>
    <Topnav width="55%" />
   {wallpaper.length === 0 ? (
        <SkeletonLoader width="100%" height="60vh"  count={1}/>
      ) : (
        <Header data={wallpaper} />
      )}
    <div className='p-2 flex justify-between items-center'>
      <h1 className='text-zinc-300 text-2xl font-bold mr-2' >Trending <i className="ri-fire-fill text-indigo-700 "/> </h1> 
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
    <HorizontalCards data={trending} />
  
    </div>
    </>
  )
}
