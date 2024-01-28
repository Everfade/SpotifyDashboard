// pages/dashboard.js
import React from "react";
import SongCard from "@/components/Songs/SongCard";
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
  // Add more dummy song data as needed
];

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-800 min-h-screen">
      <h1 className="text-white text-3xl mb-6">Spotify Song Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dummySongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
