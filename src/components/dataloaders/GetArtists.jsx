import React, { useState } from "react";
import axios from "axios";

const ArtistsComponent = ({ token }) => {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]); // State to hold the list of artists

  const searchArtists = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload

    if (!searchKey.trim()) return; // Check if the search key is not just whitespace

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });

      setArtists(data.artists.items); // Update state with the list of artists
    } catch (error) {
      console.error("Error searching artists:", error);
      setArtists([]);  
    }
  };

  return (
    <div>
      <form onSubmit={searchArtists} className="space-y-4">
        <div>
          <label htmlFor="searchKey" className="block text-sm font-medium ">Search Artists</label>
          <input
            type="text"
            name="searchKey"
            id="searchKey"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Search
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Artists</h3>
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <li key={artist.id} className="col-span-1 flex shadow-sm rounded-md">
              <div className="flex-shrink-0 flex items-center justify-center w-16 bg-indigo-500 text-white text-sm font-medium rounded-l-md">{artist.name[0]}</div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <a href="#" className="text-gray-900 font-medium hover:text-gray-600">{artist.name}</a>
                  <p className="text-gray-500">{artist.followers.total} Followers</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistsComponent;
