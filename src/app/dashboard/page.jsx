"use client"
import React, { useEffect, useState } from "react";
import SongCard from "@/components/Songs/SongCard";
import ArtistsComponent from "@/components/dataloaders/GetArtists";
import { fetchTopSongs } from "@/components/dataloaders/TopSongs";
import SongListComponent from "@/components/Songs/SongListComponent";
import UserProfileComponent from "@/components/UserProfileComponent";
import { fetchUserProfile } from "@/components/dataloaders/GetUserData";
const Dashboard = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [token, setToken] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch user profile
      fetchUserProfile(storedToken).then(profile => {
        setUserProfile(profile);
      });

      // Fetch top songs
      fetchTopSongs(storedToken).then(songs => {
        setTopSongs(songs);
      }).catch(error => {
        console.error("Error fetching top songs:", error);
      });
    } else {
      console.log("Should redirect to login");
    }
  }, []);

  return (
    <div className="p-8 bg-gray-800">
      <h1 className="text-white text-4xl text-center mb-12">Spotify Dashboard</h1>
      {userProfile &&<h2 className="text-white text-4xl text-center mb-12">Welcome, {userProfile.display_name}</h2>}
      <div className="container mx-auto">
        {userProfile && (
          <div className="mb-8">
            <UserProfileComponent userProfile={userProfile} />
          </div>
        )}
        <div className="mb-8">
          <h2 className="text-white text-2xl mb-4">Your Top Songs</h2>
          <SongListComponent songs={topSongs} />
        </div>
        <div className="mb-8">
          <h2 className="text-white text-2xl mb-4">Your Top Artists</h2>
          <ArtistsComponent token={token} />
        </div>
        <div className="mb-8">
          <h2 className="text-white text-2xl mb-4">Recently Played Tracks</h2>
       
        </div>
        {/* Add more components as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
