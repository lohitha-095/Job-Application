import React from 'react';

const QualificationSection = ({ qualification, setQualification, ugText, setUgText, pgText, setPgText, otherQualification, setOtherQualification }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900">Qualification</label>
    <div className="flex items-center">
      <select
        value={qualification}
        onChange={(e) => setQualification(e.target.value)}
        className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Qualification</option>
        <option value="UG">UG</option>
        <option value="PG">PG</option>
        <option value="Other">Other</option>
      </select>
      {qualification === 'UG' && (
        <input
          type="text"
          value={ugText}
          onChange={(e) => setUgText(e.target.value)}
          placeholder="Enter UG details"
          className="ml-2 p-2 border border-gray-300 rounded-md"
        />
      )}
      {qualification === 'PG' && (
        <input
          type="text"
          value={pgText}
          onChange={(e) => setPgText(e.target.value)}
          placeholder="Enter PG details"
          className="ml-2 p-2 border border-gray-300 rounded-md"
        />
      )}
      {qualification === 'Other' && (
        <input
          type="text"
          value={otherQualification}
          onChange={(e) => setOtherQualification(e.target.value)}
          placeholder="Enter other qualification details"
          className="ml-2 p-2 border border-gray-300 rounded-md"
        />
      )}
    </div>
  </div>
);

export default QualificationSection;
