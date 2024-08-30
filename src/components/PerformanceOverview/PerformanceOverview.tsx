import React from 'react';

const PerformanceOverview = () => {
  const data = {
    completedAudits: 120,
    pendingAudits: 45,
    averageDuration: '5 days',
    criticalIssues: 10,
    highPriorityIssues: 15,
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Performance Overview
      </h4>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
          <h5 className="text-sm font-medium text-black dark:text-white">
            Completed Audits
          </h5>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-300">
            {data.completedAudits}
          </p>
        </div>
        <div className="rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
          <h5 className="text-sm font-medium text-black dark:text-white">
            Pending Audits
          </h5>
          <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-300">
            {data.pendingAudits}
          </p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
          <h5 className="text-sm font-medium text-black dark:text-white">
            Avg. Audit Duration
          </h5>
          <p className="text-2xl font-semibold text-green-600 dark:text-green-300">
            {data.averageDuration}
          </p>
        </div>
        <div className="rounded-lg bg-red-100 p-4 dark:bg-red-900">
          <h5 className="text-sm font-medium text-black dark:text-white">
            Critical Issues
          </h5>
          <p className="text-2xl font-semibold text-red-600 dark:text-red-300">
            {data.criticalIssues}
          </p>
        </div>
        <div className="rounded-lg bg-orange-100 p-4 dark:bg-orange-900">
          <h5 className="text-sm font-medium text-black dark:text-white">
            High Priority Issues
          </h5>
          <p className="text-2xl font-semibold text-orange-600 dark:text-orange-300">
            {data.highPriorityIssues}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
