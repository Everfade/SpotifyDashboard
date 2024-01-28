export const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Spotify API responded with ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // The user profile data
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  