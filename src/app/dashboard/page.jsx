// pages/dashboard.js
"use client";

import React, { useEffect, useState } from "react";
import SongCard from "@/components/Songs/SongCard";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import ArtistsComponent from "@/components/dataloaders/GetArtists";
import { fetchTopSongs } from "@/components/dataloaders/TopSongs";
const dummySongs = [
  {
    id: 1,
    title: "Song Title 1",
    artist: "Artist Name 1",
    album: "Album Name 1",
    image: "https://via.placeholder.com/150", // Placeholder image
  },
  {
    id: 2,
    title: "Song Title 2",
    artist: "Artist Name 2",
    album: "Album Name 2",
    image: "https://via.placeholder.com/150", // Placeholder image
  },
 
];

const Dashboard = () => {
  
  const [topSongs, setTopSongs] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); 
      //we good
      fetchTopSongs(storedToken).then(songs => {
 
        console.log(songs)
        setTopSongs(songs);
      }).catch(error => {
        console.error("Error fetching top songs:", error);
        // Handle errors, for example, by showing an error message
      });



    } else {
    console.log("SHOUDL REDIERCT TO LOGIN")
    }
  }, []);

  return (
    <div className="p-8 bg-gray-800  ">
      <h1 className="text-white text-4xl text-center mb-12">Spotify Song Dashboard</h1>
      <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
      <div>
        <ArtistsComponent token={token} ></ArtistsComponent>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
