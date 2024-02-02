"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from 'next/navigation';
import TopSongs from "../../components/Songs/TopSongComponent";
import UserProfileComponent from "../../components/UserProfileComponent";
const Dashboard = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    const fetchUserPofiles = async () => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error('No token found');
      }
      try {
        const response = await fetch("/api/user", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch User Profile');
        }
        const data = response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch User Profile:', error.message);
        throw error;
      }
    };

    if (storedToken && !userProfile) {
      fetchUserPofiles().then(profile => setUserProfile(profile));
    } else if (!storedToken) {
      router.push('/login');
    }
  }, [router, userProfile]);
  return (
    <div className="bg-gray-800">
      <Navbar /> {/* Include the Navbar at the top */}
      <div className="">
        <div>
        <h1 className="text-white text-4xl text-center mb-12">Spotify Dashboard</h1>

        <div className="">
          <UserProfileComponent userProfile={userProfile}></UserProfileComponent></div>

          </div>
      
        {userProfile && (
          <div className="flex flex-row  " >
        
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
