import React from 'react';

const ProfileImage = ({ imageUrl, onImageChange }) => (
  <div className="profile-image w-1/2 flex flex-col items-center">
    {imageUrl ? (
      <img src={imageUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
    ) : (
      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        No Image
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      id="profileImage"
      onChange={onImageChange}
      className="hidden-input"
    />
    <label htmlFor="profileImage" className="custom-file-label">
      Choose Profile
    </label>
  </div>
);

export default ProfileImage;
