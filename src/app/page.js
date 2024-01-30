"use client"
import { useEffect,useState } from "react";
import React from "react";



const Login = () => {
  useEffect(() => {
    // Function to extract the token from URL hash
    const getTokenFromUrlHash = (hash) => {
      const stringAfterHash = hash.substring(1); // Remove the '#' character
      const paramsInUrl = stringAfterHash.split('&');
      const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
        const [key, value] = currentValue.split('=');
        accumulator[key] = value;
        return accumulator;
      }, {});

      return paramsSplitUp.access_token;
    };

    const hash = window.location.hash;
    let localToken = window.localStorage.getItem("token");

    if (!localToken && hash) {
      const access_token = getTokenFromUrlHash(hash);
      window.location.hash = ""; // Clear the hash in the URL
      window.localStorage.setItem("token", access_token); // Save the token in local storage
      setToken(access_token); // Update state with the token
    } else if (localToken) {
      setToken(localToken); // Set token from local storage if it's already there
    }
  }, [])
  const [token,setToken]=useState("")
  const handleLogin = () => {
    // Use environment variables for the client ID and redirect URI
    const clientId = "8afc6482aa604bb4a2b0b357bab21ce4";
    
    console.log(clientId)
    const redirectUri = "http://localhost:3000/callback";
    const scopes = [
      "user-read-private",
      "user-read-email",
      // Add other scopes as needed
    ];

    // Redirect to Spotify login page
     window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <button
        onClick={handleLogin}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
