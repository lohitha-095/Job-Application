import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserProfile,
  uploadUserProfileImage,
  updateUserEmail,
  updateUserContact,
  updateUserQualification,
  updateUserJobRole,
  updateUserSkills,
  updateUserExperience,
  updateUserPreferredJobLocation,
  uploadResume as updateUserResume // Rename the action function
} from "../../Store/actions/userActions"; // Adjust import as needed
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  // State for form fields
  const [email, setEmail] = useState(userInfo.email);
  const [contact, setContact] = useState(userInfo.contact);
  const [linkedin, setLinkedin] = useState(userInfo.linkedin || '');
  const [qualification, setQualification] = useState(userInfo.qualification || '');
  const [ugText, setUgText] = useState('');
  const [pgText, setPgText] = useState('');
  const [otherQualification, setOtherQualification] = useState(userInfo.otherQualification || '');
  const [jobRole, setJobRole] = useState(userInfo.jobRole || '');
  const [skills, setSkills] = useState(userInfo.skills || []);
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(userInfo.experience || '');
  const [jobHistory, setJobHistory] = useState([
    { id: 1, currentJobTitle: '', currentCompany: '', currentlyWorking: false, startDate: '', endDate: '', previousCompany: '' }
  ]);
  
  const handleJobInputChange = (id, key, value) => {
    const updatedJobHistory = jobHistory.map(entry => {
      if (entry.id === id) {
        return { ...entry, [key]: value };
      }
      return entry;
    });
    setJobHistory(updatedJobHistory);
  };
  
  const addJobHistoryEntry = () => {
    setJobHistory([
      ...jobHistory,
      { id: jobHistory.length + 1, currentJobTitle: '', currentCompany: '', currentlyWorking: false, startDate: '', endDate: '', previousCompany: '' }
    ]);
  };
  const removeJobHistoryEntry = (id) => {
    const updatedJobHistory = jobHistory.filter(entry => entry.id !== id);
    setJobHistory(updatedJobHistory);
  };

  const handleInputChange = (id, key, value) => {
    const updatedJobHistory = jobHistory.map(entry => {
      if (entry.id === id) {
        return { ...entry, [key]: value };
      }
      return entry;
    });
    setJobHistory(updatedJobHistory);
  };
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(userInfo.currentlyWorking || false); // New state for currently working checkbox// New state for currently working checkbox
  const [startDate, setStartDate] = useState(''); // State for start date when currently working
   
  const [endDate, setEndDate] = useState(userInfo.endDate || '');
  const [previousCompany, setPreviousCompany] = useState('');
  const [preferredJobLocation, setPreferredJobLocation] = useState(userInfo.preferredJobLocation || '');
  const [otherJobLocation, setOtherJobLocation] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]); // State for selected skills
  const [showJobHistory, setShowJobHistory] = useState(experience === 'Experienced'); // Toggle Job History visibility

  // Fetch user data (simulated)
 useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Replace with your actual API endpoint
        const fetchedUserData = response.data; // Assuming response.data contains user data
        
        // Update state with fetched user data
        setUserInfo({
          name: fetchedUserData.name || '',
          email: fetchedUserData.email || '',
          contact: fetchedUserData.contact || '',
          linkedin: fetchedUserData.linkedin || '',
          profileImage: fetchedUserData.profileImage || '',
          jobRole: fetchedUserData.jobRole || '',
          skills: fetchedUserData.skills || [],
          experience: fetchedUserData.experience || '',
          currentJobTitle: fetchedUserData.currentJobTitle || '',
          currentCompany: fetchedUserData.currentCompany || '',
          previousCompany: fetchedUserData.previousCompany || '',
          preferredJobLocation: fetchedUserData.preferredJobLocation || ''
        });

        // Update additional state variables if needed
        setStartDate(fetchedUserData.startDate || '');
        setEndDate(fetchedUserData.endDate || '');

        // Dispatch action to update user profile in Redux store
        dispatch(updateUserProfile(fetchedUserData));

        // Set selected skills based on fetched data
        setSelectedSkills(fetchedUserData.skills || []);

        // Update Job History visibility based on fetched data
        setShowJobHistory(fetchedUserData.experience === 'Experienced');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error if necessary
      }
    };

    fetchUserData();
  }, [dispatch]);


  // Dropdown options for skills
  const skillOptions = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'C#',
    'PHP',
    'Ruby',
    'Swift',
    'TypeScript',
    'SQL',
    'HTML',
    'CSS'
  ];

  // Handler to add selected skill from dropdown
  const handleAddSkillFromDropdown = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setShowSkillDropdown(false); // Hide the dropdown
  };

  // Handler to remove selected skill
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
  };
  //function to upload profile image
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      try {
        const response = await axios.post('/api/user/profile/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const imageUrl = response.data.imageUrl; // Assuming server returns the URL of the uploaded image

        // Dispatch action to update profile image in Redux store
        dispatch(uploadUserProfileImage(imageUrl));

        // Optionally, update local state or Redux store with the new image URL
        // setUserInfo({ ...userInfo, profileImage: imageUrl });

        alert('Profile image updated successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to update profile image.');
      }
    }
  };
  
   // Function to handle updating resume
  const handleUpdateResume = async () => {
    try {
      // Assuming resumeFile is already set in state
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);

      const response = await axios.post('/api/user/uploadResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Dispatch action to update user resume in Redux store
      dispatch(updateUserResume(response.data));
    } catch (error) {
      console.error('Error uploading resume:', error);
      // Handle error if necessary
    }
  };


  
// Function to save user profile using Axios
const handleSave = () => {
  const userProfileData = {
    email,
    contact,
    linkedin,
    qualification,
    ugText,
    pgText,
    otherQualification,
    jobRole,
    skills: selectedSkills,
    experience,
    currentJobTitle,
    currentCompany,
    startDate: currentlyWorking ? startDate : '',
    endDate: currentlyWorking ? '' : endDate,
    preferredJobLocation,
    otherJobLocation,
    resumeFile
  };

  axios.post('/api/user/profile', userProfileData)
    .then(response => {
      // Handle success if needed
      console.log('User profile saved successfully:', response.data);
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error saving user profile:', error);
    });
};

  // Function to clear all form fields
  const handleClear = () => {
    setEmail('');
    setContact('');
    setLinkedin('');
    setQualification('');
    setUgText('');
    setPgText('');
    setOtherQualification('');
    setJobRole('');
    setSkills([]);
    setExperience('');
    setCurrentJobTitle('');
    setCurrentCompany('');
    setCurrentlyWorking(false); // Reset currently working checkbox
    setStartDate(''); // Reset startDate
    setWorkYears(''); // Reset workYears
    setPreviousCompany('');
    setPreferredJobLocation('');
    setOtherJobLocation('');
    setResumeFile(null);
    setSelectedSkills([]);
    setShowJobHistory(false); // Ensure Job History section is hidden on clear
  };

  // Other input change handlers (email, contact, linkedin, etc.)...

  return (
    <div className="profile-page flex p-8 bg-gray-100 flex-col items-center">
      {/* Profile image section */}
      <div className="profile-image w-1/2 flex flex-col items-center">
        {userInfo.profileImage ? (
          <img src={userInfo.profileImage} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          onChange={handleImageChange}
          className="hidden-input"
        />
        <label htmlFor="profileImage" className="custom-file-label">
          Choose Profile
        </label>
      </div>

      {/* User info section */}
      <div className="user-info w-1/2">
        <h2 className="text-2xl font-bold mb-4">{userInfo.name}</h2>

        {/* Contact number input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Contact Number</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email input */}
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

        {/* LinkedIn profile input */}
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

        {/* Qualification input */}
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
            {qualification === 'UG' && (               <input
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

       

        {/* Selected Skills display */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Skills</label>
          <div className="selected-skills flex flex-wrap mb-2">
            {selectedSkills.map((skill, index) => (
              <div
                key={index}
                className="selected-skill bg-gray-200 text-gray-900 rounded-full px-2 py-1 m-1 flex items-center"
              >
                 
                <span className="ml-2">{skill}</span>
                <button
                  className="ml-2 text-red-600"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <IoMdCloseCircle />
                </button>
              </div>
            ))}
          </div>

          {/* Skills dropdown for adding additional skills */}
          <div className="flex items-center">
            <select
              value={''} // Placeholder value, not binding any state directly
              onChange={(e) => handleAddSkillFromDropdown(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Skill</option>
              {skillOptions
                .filter(skill => !selectedSkills.includes(skill))
                .map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
            </select>
          </div>
        </div>
         {/* Job Role input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Prefered Job Role</label>
          <input
            type="text"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
          {/* Preferred Job Location */}
          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Preferred Job Location</label>
          <div className="flex items-center">
            <select
              value={preferredJobLocation}
              onChange={(e) => setPreferredJobLocation(e.target.value)}
              className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Job Location</option>
              {['California', 'New York', 'Texas', 'Washington', 'Others'].map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {preferredJobLocation === 'Others' && (
              <input
                type="text"
                value={otherJobLocation}
                onChange={(e) => setOtherJobLocation(e.target.value)}
                placeholder="Enter other job location"
                className="ml-2 p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Experience</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="block appearance-none w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="Student">Student</option>
          <option value="Experienced">Experienced</option>
        </select>
      </div>


        <div className="mb-4">
    <label className="block text-sm font-medium text-gray-900">Job History</label>
    <button onClick={addJobHistoryEntry} className="text-blue-500 hover:text-blue-700">
          <IoMdAdd size={24} />
        </button>
    <div className="job-history">
      {jobHistory.map((job, index) => (
        <div key={job.id}>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={job.currentJobTitle}
              onChange={(e) => handleJobInputChange(job.id, 'currentJobTitle', e.target.value)}
              placeholder="Job Title"
              className="p-2 border border-gray-300 rounded-md flex-1 mr-2"
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={job.currentCompany}
              onChange={(e) => handleJobInputChange(job.id, 'currentCompany', e.target.value)}
              placeholder="Company Name"
              className="p-2 border border-gray-300 rounded-md flex-1 mr-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              <input
                type="checkbox"
                checked={job.currentlyWorking}
                onChange={(e) => handleJobInputChange(job.id, 'currentlyWorking', e.target.checked)}
                className="mr-2"
              />
              Currently Working
            </label>
          </div>
          {job.currentlyWorking && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">Start Date</label>
              <input
                type="date"
                value={job.startDate}
                onChange={(e) => handleJobInputChange(job.id, 'startDate', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          {!job.currentlyWorking && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">Start Date</label>
                <input
                  type="date"
                  value={job.startDate}
                  onChange={(e) => handleJobInputChange(job.id, 'startDate', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">End Date</label>
                <input
                  type="date"
                  value={job.endDate}
                  onChange={(e) => handleJobInputChange(job.id, 'endDate', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}
         
          
        </div>
      ))}
       {jobHistory.map(job => (
        <div key={job.id} className="flex items-center mb-2">
          <FaMinus
            className="text-red-600 cursor-pointer"
            onClick={() => removeJobHistoryEntry(job.id)}
          />
        </div>
      ))}
    </div>
  </div>

      

        {/* Resume upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Resume</label>
          <div className="flex items-center">
            <input
              type="file"
              id="resumeFile"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="hidden-input"
            />
            <label htmlFor="resumeFile" className="custom-file-label">
              Upload Resume
            </label>
            {resumeFile && (
              <button
                onClick={handleUpdateResume}
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
              >
                Update Resume
              </button>
            )}
          </div>
        </div>

        {/* Save and Clear buttons */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


