export const fetchTopSongs = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Spotify API responded with ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.items; // The top tracks are contained in the 'items' array
    } catch (error) {
      console.error("Error fetching top songs:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  