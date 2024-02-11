// pages/api/userProfile.js
const { NextResponse } = require('next/server');
const axios = require('axios');

async function GET(req) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Authorization token is missing." }), { status: 401 });
  }

  try {
    
    const spotifyUrl = "https://api.spotify.com/v1/me";
    console.log("Spotify API URL:", spotifyUrl.toString());

    // Make the request to the Spotify API
    const spotifyResponse = await axios.get(spotifyUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Send the user's profile data back to the client
    return new NextResponse(JSON.stringify(spotifyResponse.data), { status: 200 });

  } catch (error) {
    console.error("Error User Profile:", error);
    return new NextResponse(JSON.stringify({ message: error.message }), { status: error.response ? error.response.status : 500 });
  }
}

module.exports = { GET };
