"use client"
import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash"; // Import lodash
import CompactSongListViewComponent from "./SongListViewComponent";
import SongListComponent from "./SongListComponent";

const fetchTopSongs = async (timeRange = 'medium_term', limit = 30) => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await fetch(`/api/songs?time_range=${timeRange}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': "Bearer "+token,
        'Accept': 'application/json' 
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch top songs');
    }
    const data =  response.json() ;
    return data;
  } catch (error) {
    console.error('Error fetching top songs:', error.message);
    throw error;  
  }
};




const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [token, setToken] = useState("");
 
  const [songLimit, setSongLimit] = useState(20);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [isCompactView, setIsCompactView] = useState(false);

    
   const debouncedSetSongLimit = useCallback(_.debounce((newLimit) => {
    setSongLimit(newLimit);
   }, 500), []);  

    
   const debouncedSetTimeRange = useCallback(_.debounce((newRange) => {
     setTimeRange(newRange);
   }, 500), []);   

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTopSongs( timeRange, songLimit).then(songs => {
        console.log(songs)
        setTopSongs(songs);
      }).catch(error => {
        console.error("Error fetching top songs:", error);
      });
    } else {
      console.log("Should redirect to login");
    }
  }, [songLimit, timeRange]);

  return (
    <div className="bg-gray-800 mt-4 ">
                <h2 className="text-white text-center text-xl lg:text-4xl mb-4 semi-bold lg:float-left p-4   " >Your Top Songs</h2>
      <div className="container mx-auto">
        <div className="mb-8">

         
          <div className="flex flex-col lg:mt-20 md:flex-row p-4">
            <div className="flex flex-col mx-auto lg:t-10 lg:ml-0">
              <p className="text-white text-md lg:text-xl  mx-auto lg:ml-0">Number of Songs: {songLimit}</p>
              <input
                type="range"
                min="1"
                max="50"
                defaultValue={songLimit}
                onChange={(e) => debouncedSetSongLimit(e.target.value)}
                className="slider p-4 mr-14  lg:w-64 ml-14 lg:ml-0"
              />
            </div>
            <div className="text-md lg:text-xl mx-auto flex flex-row">
              <select
                defaultValue={timeRange}
                onChange={(e) => debouncedSetTimeRange(e.target.value)}
                className="mb-4 p-2 mt-2 bg-gray-700 text-md text-white"
              >
                <option className="" value="long_term">Long Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="short_term">Short Term</option>
              </select>
              <div className="flex justify-center ml-8 mb-4">
              <div className="ml-2 text-gray-200 pt-2 mr-2 text-md lg:mt-2 lg:text-xl">Compact</div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="compactViewToggle" className="sr-only" checked={isCompactView} onChange={() => setIsCompactView(!isCompactView)} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute top-1 bg-white w-6 h-6 rounded-full transition ${isCompactView ? "transform translate-x-6" : "left-1"}`}></div>
              </div>
            
            </label>
          </div>
            </div>
      

          </div>
          {isCompactView ? (
            <CompactSongListViewComponent songs={topSongs} />
          ) : (
            <SongListComponent songs={topSongs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSongs;
