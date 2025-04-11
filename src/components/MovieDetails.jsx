import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import asyncloadMovies from "../store/Actions/movieAction";
import { removemovie } from "../store/Actions/movieAction";
import Loader from "./loader";
import HorizontalCards from "./partials/HorizontalCards"

const MovieDetails = () => {
  const {pathname}=useLocation()
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadMovies(id));
    return () => dispatch(removemovie());
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.7)),url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        })  60% 20%/cover no-repeat`,
      }}
      className="w-full h-[160vh] px-[8%]   "
    >
      <nav className="h-[10vh] flex items-center gap-10 text-md text-zinc-100">
        <Link>
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-2 "
          ></i>
        </Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
        >
          imdb
        </a>
      </nav>
      <div className=" flex">
        <img
          className=" rounded h-[60vh] object-cover shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }  `}
        />
        <div className="content ml-[5%]">
          <h1 className="text-4xl text-white font-black ">
          
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title ||
              info.detail.title}
              <small className="text-xl text-white">({info.detail.release_date.split("-")[0]})</small>
          </h1>
          <div className="flex text-white gap-x-5 mt-5 mb-5 items-center">
          <span className="w-10 h-10 bg-orange-500 text-zinc-200 font-bold p-2 rounded-full shadow-lg shadow-orange-500/50 border-2 border-white flex items-center  justify-center rounded-full">
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
              </span>
              <h1 className="w-[60px] leading-5 text-2xl font-bold">User score</h1>
              <h1 className="font-semibold">{info.detail.release_date}</h1>
              <h1 className="font-semibold">{info.detail.genres.map((g)=>g.name).join(",")}</h1>
              <h1 className="font-semibold">{info.detail.runtime}min</h1>

          </div>
          <h1 className="font-semibold text-xl italic text-white">{info.detail.tagline}</h1>
          <h1 className="font-bold text-zinc-200 text-xl mt-5 mb-3">Overview</h1>
          <p className="text-zinc-200 mb-5">{info.detail.overview}</p>
         <Link to={`${pathname}/trailer`} className="text-white flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-[10vw] h-[7vh]  mt-4 rounded-lg">
                 Play Trailer <i class="text-white ri-google-play-fill ml-3"></i>
               </Link>

        </div>
      </div>

      <div className="">
        {info.watchProviders && info.watchProviders.flatrate && (
          <div className="flex gap-x-5 mt-5">
            <h1 className="text-zinc-100 text-md">Available on</h1>
            {info.watchProviders.flatrate.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className=" rounded w-[5vh] h-[vh] object-cover shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}  `}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchProviders && info.watchProviders.rent && (
          <div className="flex gap-x-5 mt-5">
            <h1 className="text-zinc-100 text-md">Available on rent</h1>
            {info.watchProviders.rent.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className=" rounded w-[5vh] h-[vh] object-cover shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}  `}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchProviders && info.watchProviders.buy && (
          <div className="flex gap-x-5 mt-5">
            <h1 className="text-zinc-100 text-md">Available to buy</h1>
            {info.watchProviders.buy.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className=" rounded w-[5vh] h-[vh] object-cover shadow-[10px_16px_40px_6px_rgba(0,0,0,0.9)]"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}  `}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-10 mb-4 border-none h-[2px] bg-zinc-400"/>
      <h1 className="text-2xl text-zinc-200 font-semibold">Still Hungry for More?</h1>
      <HorizontalCards  data={ info.recommendations? info.recommendations : info.similar} />
      <Outlet />
    </div>
  
  ) : (
    <Loader />
  );
};

export default MovieDetails;
