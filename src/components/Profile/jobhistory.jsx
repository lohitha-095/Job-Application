import React from 'react';

const JobHistorySection = ({ jobHistory, setJobHistory }) => {
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

  const handleJobInputChange = (id, key, value) => {
    const updatedJobHistory = jobHistory.map(entry => {
      if (entry.id === id) {
        return { ...entry, [key]: value };
      }
      return entry;
    });
    setJobHistory(updatedJobHistory);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900">Job History</label>
      <button onClick={addJobHistoryEntry} className="text-blue-500 hover:text-blue-700">
        Add Job
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
            {!job.currentlyWorking && (
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">End Date</label>
                <input
                  type="date"
                  value={job.endDate}
                  onChange={(e) => handleJobInputChange(job.id, 'endDate', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobHistorySection;
