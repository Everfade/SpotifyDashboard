import React from "react";

const SongCard = ({rank, song }) => {
  // Join all artist names into a single string
  const artistNames = song.artists.map(artist => artist.name).join(", ");

  // Choose the first image from the album's images array, if available
  const imageUrl = song.album.images[0]?.url || 'https://via.placeholder.com/150'; // Fallback to a placeholder if no image is available

  return (
    <div className="bg-gray-700  text-white p-4 rounded-lg w-80">
      <img src={imageUrl} alt={`Album art for ${song.name}`} className="rounded-lg mb-4  " />
     <span className="flex flex-row text-xl ">Rank: {rank}&nbsp; <h3 className="text-xl font-bold"> {song.name}</h3></span>
      <p className="text-md">Artist: {artistNames}</p>
      <p className="text-md">Album: {song.album.name}</p>
    </div>
  );
};

export default SongCard;
