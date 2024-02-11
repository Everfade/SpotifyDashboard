import React from "react";

const SongCard = ({rank, song }) => {
 
  const artistNames = song.artists.map(artist => artist.name).join(", ");

 
  const imageUrl = song.album.images[0]?.url || 'https://via.placeholder.com/150'; // Fallback to a placeholder if no image is available

  return (
    <div className="lg:bg-gray-700  text-white p-2 rounded-lg mx-auto  ">
      <img src={imageUrl} alt={`Album art for ${song.name}`} className="rounded-lg mx-auto w-44 mb-4 md:w-64 lg:w-80" />

      <div className="text-center">
     <span className="flex flex-row justify-center txt-md pb-1 lg:text-xl   ">{rank}&nbsp; <h3 className="txt-md lg:text-xl font-bold"> {song.name}</h3></span>
     <p className="text-md text-gray-200 text-opacity-90"> {artistNames}</p>
     </div>

    </div>
  );
};

export default SongCard;
