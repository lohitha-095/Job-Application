import React, { useState } from 'react';
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import QualificationSection from './QualificationSection';
import SkillsSection from './SkillsSection';
import JobHistorySection from './JobHistorySection';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [qualification, setQualification] = useState('');
  const [ugText, setUgText] = useState('');
  const [pgText, setPgText] = useState('');
  const [otherQualification, setOtherQualification] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);

  const handleImageChange = (event) => {
    // Handle image change logic
  };

  return (
    <div className="profile-container">
      <ProfileImage imageUrl={''} onImageChange={handleImageChange} />
      <UserInfo
        email={email}
        setEmail={setEmail}
        contact={contact}
        setContact={setContact}
        linkedin={linkedin}
        setLinkedin={setLinkedin}
      />
      <QualificationSection
        qualification={qualification}
        setQualification={setQualification}
        ugText={ugText}
        setUgText={setUgText}
        pgText={pgText}
        setPgText={setPgText}
        otherQualification={otherQualification}
        setOtherQualification={setOtherQualification}
      />
      <SkillsSection selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
      <JobHistorySection jobHistory={jobHistory} setJobHistory={setJobHistory} />
    </div>
  );
};

export default Profile;
