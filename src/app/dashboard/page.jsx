"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path according to your project structure
import SongListComponent from "@/components/Songs/SongListComponent";
import UserProfileComponent from "@/components/UserProfileComponent";
import { fetchUserProfile } from "@/components/dataloaders/GetUserData";
import { useRouter } from 'next/navigation';

import { fetchTopSongs } from "@/components/dataloaders/TopSongs";
import TopSongs from "@/components/Songs/TopSongComponent";
const Dashboard = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (!userProfile) {
        fetchUserProfile(storedToken)
          .then(profile => {
            setUserProfile(profile);
          })
          .catch(error => {
            if (error.response && error.response.status === 401) {
        
              window.localStorage.removeItem("token");  
              setToken("");  
              console.log("Token is invalid, redirecting to login");
              router.push('/login');
            }
          });
      }
    } else {
      console.log("Should redirect to login");
      router.push('/login');
    }
  }, [router,userProfile]); // Add userProfile to the dependency array if it makes sense in your component logic
  

  return (
    <div className="bg-gray-800 ">
      <Navbar /> {/* Include the Navbar at the top */}
      <div className=" ">
        <h1 className="text-white text-4xl text-center mb-12">Spotify Dashboard</h1>
        {userProfile && <h2 className="text-white text-4xl text-center mb-12">Welcome, {userProfile.display_name}</h2>}
        <div className="container mx-auto">
          {userProfile && (
            <div className="mb-8">
              <UserProfileComponent userProfile={userProfile} />
            </div>
          )}
         <TopSongs></TopSongs>
    </div>
    </div>

    </div>
  );
};

export default Dashboard;
