import React from 'react';

const UserCard = ({ user, rank }) => {
  // Generate a random profile image
  const imageId = Math.floor(Math.random() * 100);
  const imageUrl = `https://randomuser.me/api/portraits/men/${imageId}.jpg`;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center transition-all hover:shadow-lg">
      <div className="mr-4 relative">
        <div className="absolute -top-2 -left-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
          {rank}
        </div>
        <img 
          src={imageUrl} 
          alt={`${user.name}`} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium">{user.name}</h3>
        <p className="text-gray-600">
          <span className="font-bold text-blue-600">{user.postCount}</span> posts
        </p>
      </div>
    </div>
  );
};

export default UserCard;