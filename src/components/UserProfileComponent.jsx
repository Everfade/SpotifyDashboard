const UserProfileComponent = ({ userProfile }) => {
 
  if (!userProfile) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg   lg:max-w-lg lg:float-right mx-auto  ">
      <div className="flex items-center space-x-4">
        <img
          src={userProfile.images[0]?.url || 'https://via.placeholder.com/150'}
          alt="User"
          className="w-20 h-20 rounded-full ml-8f"
        />
        <div>
          <h2 className="text-2xl font-semibold">{userProfile.display_name}</h2>
          <p className="text-sm">Followers: {userProfile.followers.total}</p>
          <p className="text-sm">Country: {userProfile.country}</p>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfileComponent;
