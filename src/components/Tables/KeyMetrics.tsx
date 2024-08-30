import React from 'react';

const KeyMetrics = () => {
  const metrics = [
    { title: 'Total Audits Completed', value: 30 },
    { title: 'Average Risk Level', value: 'Medium' },
    { title: 'Critical Issues Identified', value: 10 },
    { title: 'Auditors Active', value: 7 },
    { title: 'Upcoming Audit Deadlines', value: 5 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {metrics.map((metric, index) => (
        <div key={index} className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {metric.title}
          </h5>
          <p className="text-2xl font-semibold text-primary dark:text-white">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;
