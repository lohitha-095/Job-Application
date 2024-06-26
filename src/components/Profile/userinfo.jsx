import React from 'react';

const UserInfo = ({ email, setEmail, contact, setContact, linkedin, setLinkedin }) => (
  <div className="user-info w-1/2">
    <h2 className="text-2xl font-bold mb-4">User Info</h2>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">Contact Number</label>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Please enter a valid email"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">LinkedIn Profile</label>
      <input
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="Enter your LinkedIn profile URL"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  </div>
);

export default UserInfo;
