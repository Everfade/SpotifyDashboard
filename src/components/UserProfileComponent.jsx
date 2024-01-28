import React from "react";

const UserProfileComponent = ({ userProfile }) => {
    console.log(userProfile)
  if (!userProfile) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-sm mx-auto">
      <div className="flex items-center space-x-4">
        <img
          src={userProfile.images[0]?.url || 'https://via.placeholder.com/150'}
          alt="User"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{userProfile.display_name}</h2>
          <p className="text-sm">Followers: {userProfile.followers.total}</p>
          <p className="text-sm">Country: {userProfile.country}</p>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
