import React, { useEffect, useState } from "react";
import SongCard from "@/components/Songs/SongCard";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import ArtistsComponent from "@/components/dataloaders/GetArtists";
import { fetchTopSongs } from "@/components/dataloaders/TopSongs";
 
const SongListComponent = ({ songs }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {songs.map((song, index) => (
      
          <SongCard key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default SongListComponent;
 