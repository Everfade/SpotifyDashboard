"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
const Login = () => {
  const [token, setToken] = useState("");
  const router = useRouter()
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // getToken()


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    console.log(token)
    setToken(token)

}, [])

  useEffect(() => {
    // If the token is not set, automatically initiate the login process
    if (!token) {
    //  handleLogin();
    }
    else{
      router.push("/dashboard");
    }
  }, [token]); // This effect depends on the `token` state

  const handleLogin = () => {
    const clientId = "8afc6482aa604bb4a2b0b357bab21ce4";
    const redirectUri = "http://localhost:3000/login";
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
      {!token ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
        >
          Login with Spotify
        </button>
      ) : (
        <div className="text-white">Login Successful! </div>
      )}
    </div>
  );
};

export default Login;
