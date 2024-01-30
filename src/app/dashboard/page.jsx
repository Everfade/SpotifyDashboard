"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path according to your project structure
import SongListComponent from "@/components/Songs/SongListComponent";
import UserProfileComponent from "@/components/UserProfileComponent";
import { fetchUserProfile } from "@/app/api/GetUserData";
import { useRouter } from 'next/navigation';

import { fetchTopSongs } from "@/app/api/TopSongs";
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
            console.log(error)
            if (error.code==401) {
        
              window.localStorage.removeItem("token");  
              setToken("");  
              console.log("Token is invalid, redirecting to login");
              router.push('/login');
            }
          });
      }
    }
     else {
      console.log("Should redirect to login");
      router.push('/login');
    }
  }, [router,userProfile]); // Add userProfile to the dependency array if it makes sense in your component logic
  

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
