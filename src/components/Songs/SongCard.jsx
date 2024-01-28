// components/SongCard.js
import React from "react";

const SongCard = ({ song }) => {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      <img src={song.image} alt={song.title} className="rounded-lg mb-4" />
      <h3 className="text-xl font-bold">{song.title}</h3>
      <p className="text-md">Artist: {song.artist}</p>
      <p className="text-md">Album: {song.album}</p>
    </div>
  );
};

export default SongCard;
