import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const auditData = [
  {
    id: 1,
    organization: 'Organization A',
    name: 'Project Alpha',
    organizationType: 'Private',
    auditType: 'Cyber Products',
    riskLevel: 'High',
    findings: 'Outdated systems, Non-compliance',
    recommendations: 'Update systems, Implement standards',
    auditor: 'John Doe',
    Date: '2024-01-15',
    projectType: 'Development',
  },
  {
    id: 2,
    organization: 'Organization B',
    name: 'Project Beta',
    organizationType: 'Public',
    auditType: 'Network Infrastructure',
    riskLevel: 'Medium',
    findings: 'Insufficient resources, Capacity issues',
    recommendations: 'Increase resources, Improve training',
    auditor: 'Jane Smith',
    Date: '2024-02-10',
    projectType: 'Maintenance',
  },
  {
    id: 3,
    organization: 'Organization C',
    name: 'Project Gamma',
    organizationType: 'Private',
    auditType: 'Cyber Products',
    riskLevel: 'Low',
    findings: 'Lack of policies',
    recommendations: 'Develop and enforce policies',
    auditor: 'Emily Johnson',
    Date: '2024-03-05',
    projectType: 'Development',
  },
];

const SimpleRequestTable = () => {
  const [filters, setFilters] = useState({
    organization: '',
    auditType: '',
    riskLevel: '',
    organizationType: '',
    auditor: '',
    projectType: '',
  });
  const navigate = useNavigate();
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleRowClick = (id) => {
    navigate(`/audit-details/${id}`); // Navigate to the details page with the audit ID
  };
  const filteredData = auditData.filter((audit) => {
    return (
      (filters.organization === '' ||
        audit.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())) &&
      (filters.auditType === '' ||
        audit.auditType
          .toLowerCase()
          .includes(filters.auditType.toLowerCase())) &&
      (filters.riskLevel === '' ||
        audit.riskLevel
          .toLowerCase()
          .includes(filters.riskLevel.toLowerCase())) &&
      (filters.organizationType === '' ||
        audit.organizationType
          .toLowerCase()
          .includes(filters.organizationType.toLowerCase())) &&
      (filters.auditor === '' ||
        audit.auditor.toLowerCase().includes(filters.auditor.toLowerCase())) &&
      (filters.projectType === '' ||
        audit.projectType
          .toLowerCase()
          .includes(filters.projectType.toLowerCase()))
    );
  });

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="p-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Simple Requests
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Overview of recent Simple Requests.
        </p>
      </div>

      {/* Filters Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={filters.organization}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Filter by Organization"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Audit Type
          </label>
          <select
            name="auditType"
            value={filters.auditType}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            title="Audit Type"
          >
            <option value="">All Types</option>
            <option value="Cyber Products">Cyber Products</option>
            <option value="Network Infrastructure">
              Network Infrastructure
            </option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Risk Level
          </label>
          <select
            name="riskLevel"
            value={filters.riskLevel}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            title="Risk Level"
          >
            <option value="">All Levels</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Organization Type
          </label>
          <select
            name="organizationType"
            value={filters.organizationType}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Type
          </label>
          <select
            name="projectType"
            value={filters.projectType}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="Development">Development</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                ID
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Organization
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Organization Type
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Audit Type
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Risk Level
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Findings
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Recommendations
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Auditor
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Date
              </th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                Project Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke dark:divide-strokedark">
            {filteredData.map((audit) => (
              <tr
                key={audit.id}
                className="hover:bg-gray-100 dark:hover:bg-meta-4"
                onClick={() => handleRowClick(audit.id)}
              >
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.id}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.organization}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.name}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.organizationType}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.auditType}
                </td>
                <td
                  className={`px-6 py-4 text-sm ${
                    audit.riskLevel === 'High'
                      ? 'text-red-500'
                      : audit.riskLevel === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  {audit.riskLevel}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.findings}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.recommendations}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.auditor}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.Date}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.projectType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleRequestTable;
