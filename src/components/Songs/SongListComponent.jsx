import React, { useEffect, useState } from "react";
import SongCard from "@/components/Songs/SongCard";
 
 
const SongListComponent = ({ songs }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song, index) => (
      
          <SongCard key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default SongListComponent;
 