const auditData = [
  {
    organization: 'Organization A',
    auditType: 'Cyber Products',
    riskLevel: 'High',
    findings: 'Outdated systems, Non-compliance',
    recommendations: 'Update systems, Implement standards',
    auditor: 'John Doe',
    status: 'Pending',
    auditDate: '2024-01-15',
  },
  {
    organization: 'Organization B',
    auditType: 'Network Infrastructure',
    riskLevel: 'Medium',
    findings: 'Insufficient resources, Capacity issues',
    recommendations: 'Increase resources, Improve training',
    auditor: 'Jane Smith',
    status: 'Pending',
    auditDate: '2024-02-10',
  },
  {
    organization: 'Organization C',
    auditType: 'Cyber Products',
    riskLevel: 'Low',
    findings: 'Lack of policies',
    status: 'Pending',
    recommendations: 'Develop and enforce policies',
    auditor: 'Emily Johnson',
    auditDate: '2024-03-05',
  },
];

const OrganizationTable = () => {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="p-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Audit Evaluations
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Overview of recent audit evaluations.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Organization</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Audit Type</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Risk Level</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Findings</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Recommendations</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Auditor</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">Audit Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stroke dark:divide-strokedark">
            {auditData.map((audit, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-meta-4">
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.organization}
                </td>
                <td className="px-6 py-4 text-sm text-black dark:text-white">
                  {audit.auditType}
                </td>
                <td className={`px-6 py-4 text-sm ${audit.riskLevel === 'High' ? 'text-red-500' : audit.riskLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
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
                  {audit.auditDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationTable;
