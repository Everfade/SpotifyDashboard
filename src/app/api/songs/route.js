// pages/api/songs.js
const { NextResponse } = require('next/server');
const axios = require('axios');

export async function GET(req) {
  console.log(req)
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(' ')[1];
  console.log("The Token:", token);

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Authorization token is missing." }), { status: 401 });
  }

  try {
    // Set default values if not provided
    const url = new URL(req.url);
    const timeRange = url.searchParams.get('time_range');
    const limit = url.searchParams.get('limit');
    const spotifyUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`;
    console.log("Spotify API URL:", spotifyUrl.toString());

    // Make the request to the Spotify API
    const spotifyResponse = await axios.get(spotifyUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Send the items array (which contains the top songs) back to the client
    return new NextResponse(JSON.stringify(spotifyResponse.data.items), { status: 200 });

  } catch (error) {
    console.error("Error fetching top songs:", error);
    return new NextResponse(JSON.stringify({ message: error.message }), { status: error.response ? error.response.status : 500 });
  }
}

 
