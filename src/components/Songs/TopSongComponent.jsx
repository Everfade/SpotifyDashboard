"use client"
import React, { useEffect, useState, useCallback } from "react";
import _ from "lodash"; // Import lodash
import Navbar from "@/components/Navbar";
import SongListComponent from "@/components/Songs/SongListComponent";
import UserProfileComponent from "@/components/UserProfileComponent";
import { fetchUserProfile } from "@/components/dataloaders/GetUserData";
import { fetchTopSongs } from "@/components/dataloaders/TopSongs";
import CompactSongListViewComponent from "./SongListViewComponent";

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [token, setToken] = useState("");
 
  const [songLimit, setSongLimit] = useState(20);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [isCompactView, setIsCompactView] = useState(false);

  // Debounce function for setting the song limit
  const debouncedSetSongLimit = useCallback(_.debounce((newLimit) => {
    setSongLimit(newLimit);
  }, 500), []); // 500ms delay

  // Debounce function for setting the time range
  const debouncedSetTimeRange = useCallback(_.debounce((newRange) => {
    setTimeRange(newRange);
  }, 500), []); // 500ms delay

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTopSongs(storedToken, timeRange, songLimit).then(songs => {
        setTopSongs(songs);
      }).catch(error => {
        console.error("Error fetching top songs:", error);
      });
    } else {
      console.log("Should redirect to login");
    }
  }, [songLimit, timeRange]);

  return (
    <div className="bg-gray-800">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-white text-center text-xl lg:text-4xl mb-4 semi-bold" >Your Top Songs</h2>
          <div className="flex flex-col lg:flex-row p-4">
            <div className="flex flex-col mx-auto lg:ml-0">
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
            <div className="sm:text-lg lg:text-xl mx-auto ">
              <select
                defaultValue={timeRange}
                onChange={(e) => debouncedSetTimeRange(e.target.value)}
                className="mb-4 p-2 mt-2 bg-gray-700  text-white"
              >
                <option value="long_term">Long Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="short_term">Short Term</option>
              </select>
            </div>
            <div className="flex justify-center ml-8 mb-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="compactViewToggle" className="sr-only" checked={isCompactView} onChange={() => setIsCompactView(!isCompactView)} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute top-1 bg-white w-6 h-6 rounded-full transition ${isCompactView ? "transform translate-x-6" : "left-1"}`}></div>
              </div>
              <div className="ml-3 text-gray-200 text-md lg:text-xl">Compact View</div>
            </label>
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
