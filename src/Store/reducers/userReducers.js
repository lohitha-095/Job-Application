// userReducer.js

import * as types from '../../utils/constants/userConstants';

const initialState = {
  // Initial state values as needed
  email: '',
  contact: '',
  linkedin: '',
  qualification: '',
  otherQualification: '',
  jobRole: '',
  skills: [],
  experience: '',
  currentJobTitle: '',
  currentCompany: '',
  timePeriod: '',
  previousCompany: '',
  preferredJobLocation: '',
  otherJobLocation: '',
  resumeFile: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case types.UPLOAD_USER_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload
      };
    case types.UPDATE_USER_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case types.UPDATE_USER_CONTACT:
      return {
        ...state,
        contact: action.payload
      };
    case types.UPDATE_USER_QUALIFICATION:
      return {
        ...state,
        qualification: action.payload
      };
    case types.UPDATE_USER_OTHER_QUALIFICATION:
      return {
        ...state,
        otherQualification: action.payload
      };
    case types.UPDATE_USER_JOB_ROLE:
      return {
        ...state,
        jobRole: action.payload
      };
    case types.UPDATE_USER_SKILLS:
      return {
        ...state,
        skills: action.payload
      };
    case types.UPDATE_USER_EXPERIENCE:
      return {
        ...state,
        experience: action.payload
      };
    case types.UPDATE_USER_PREFERRED_JOB_LOCATION:
      return {
        ...state,
        preferredJobLocation: action.payload
      };
    case types.UPLOAD_RESUME:
      return {
        ...state,
        resumeFile: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
