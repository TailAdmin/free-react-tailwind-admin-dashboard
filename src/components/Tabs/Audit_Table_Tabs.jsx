import { useState } from 'react';

const AuditTableTabs = () => {
  const [activeTab, setActiveTab] = useState('private');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="audit-table-tabs">
      <div className="tabs flex border-b border-gray-200 dark:border-gray-700">
        <div
          className={`tab px-4 py-2 cursor-pointer ${
            activeTab === 'private'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => handleTabClick('private')}
        >
          Private
        </div>
        <div
          className={`tab px-4 py-2 cursor-pointer ${
            activeTab === 'governmental'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 dark:text-gray-400'
          }`}
          onClick={() => handleTabClick('governmental')}
        >
          Governmental
        </div>
      </div>
    </div>
  );
};

export default AuditTableTabs;
