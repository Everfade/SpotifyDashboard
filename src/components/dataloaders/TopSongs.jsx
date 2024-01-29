export const fetchTopSongs = async (token, time_range = 'medium_term', limit = 30) => {
  try {
    // Construct the URL with query parameters for time_range and limit
    const url = new URL("https://api.spotify.com/v1/me/top/tracks");
    url.searchParams.append("time_range", time_range);
    url.searchParams.append("limit", limit);

    const response = await fetch(url.toString(), {
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
