import React from 'react';

const SkillsSection = ({ selectedSkills, setSelectedSkills }) => {
  const skillOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Swift', 'TypeScript', 'SQL', 'HTML', 'CSS'
  ];

  const handleAddSkillFromDropdown = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">Skills</label>
      <div className="selected-skills flex flex-wrap mb-2">
        {selectedSkills.map((skill, index) => (
          <div key={index} className="selected-skill bg-gray-200 text-gray-900 rounded-full px-2 py-1 m-1 flex items-center">
            <span className="ml-2">{skill}</span>
            <button className="ml-2 text-red-600" onClick={() => handleRemoveSkill(skill)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <select
          value={''} // Placeholder value, not binding any state directly
          onChange={(e) => handleAddSkillFromDropdown(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Skill</option>
          {skillOptions.filter(skill => !selectedSkills.includes(skill)).map((skill, index) => (
            <option key={index} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SkillsSection;
