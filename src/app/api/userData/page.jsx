
export const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Create a custom error object that includes the response status code
        const error = new Error(`Spotify API responded with ${response.status}: ${response.statusText}`);
        error.code = response.status; // Add the status code to the error object
        throw error; // Throw the custom error
      }
  
      const data = await response.json();
      return data; // The user profile data
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      throw error; // Re-throw the custom error to be handled by the caller
    }
  };
   
    