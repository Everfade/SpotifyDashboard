const CompactSongListViewComponent = ({ songs }) => {
    return (
      <div className="space-y-2 p-4">
        {songs.map((song, index) => (
          <div key={song.id} className={`flex items-center relative ${index < songs.length - 1 ? "pb-2 border-b border-gray-600" : ""}`}>
            <img src={song.album.images[0].url} alt="Album Art" className="w-16 lg:w-32" />
            <div className="pl-2 lg:pl-4">
              <p className="text-white text-md lg:text-2xl">{song.name}</p>
              <p className="text-gray-400 mt-2 text-sm lg:text-xl">{song.artists.map(artist => artist.name).join(", ")}</p>
            </div>
            <span className="absolute bottom-2 right-0 text-white text-xs lg:text-sm">{index + 1}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default CompactSongListViewComponent;
  