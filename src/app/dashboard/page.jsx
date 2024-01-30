"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path according to your project structure
 
import { fetchUserProfile } from "@/app/api/userData/page";
import { fetchTopSongs } from "@/app/api/songs/page";
import { useRouter } from 'next/navigation';
 
import TopSongs from "@/components/Songs/TopSongComponent";
const Dashboard = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      if (!userProfile) {
        fetchUserProfile(storedToken)
          .then(profile => {
            setUserProfile(profile);
            // Fetch top songs as well after we have the user profile
            return fetchTopSongs(storedToken); // Fetching top songs with the storedToken
          })
          .then(songs => {
            setTopSongs(songs); // Set the top songs state
          })
          .catch(error => {
            console.error(error);
            if (error.code === 401) {
              window.localStorage.removeItem("token");
              router.push('/login');
            }
          });
      }
    } else {
      router.push('/login');
    }
  }, [router, userProfile]);
  return (
    <div className="bg-gray-800">
    <Navbar /> {/* Include the Navbar at the top */}
    <div className="">
      <h1 className="text-white text-4xl text-center mb-12">Spotify Dashboard</h1>
  
      {/* Conditionally render userProfile related components */}
      {userProfile && (
        <div className="flex flex-row  " >
          <h2 className="text-white p-4  text-4xl text-center  mx-auto ">Welcome, {userProfile.display_name}</h2>
          <div className=" ">
           
          </div>
        </div>
      )}
  
      <div className="mx-auto container">
        <TopSongs></TopSongs>
      </div>
    </div>
  </div>
  
  );
};

export default Dashboard;
