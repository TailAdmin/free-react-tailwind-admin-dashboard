import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { auditData } from '../components/Tables/OrganizationAuditTable'; // Assuming this is your data source

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF6347'];

const AuditDetails = () => {
  const { id } = useParams(); 
  const audit = auditData.find((audit) => audit.id === parseInt(id)); // Find the audit by ID
  const navigate = useNavigate();

  // Audit state for editable fields
  const [auditStatus, setAuditStatus] = useState(audit ? audit.status || 'Pending' : '');
  const [findings, setFindings] = useState(audit ? audit.findings : '');
  const [recommendations, setRecommendations] = useState(audit ? audit.recommendations : '');

  // Editable graph data
  const [riskLevels, setRiskLevels] = useState({
    high: audit.riskLevel === 'High' ? 1 : 0,
    medium: audit.riskLevel === 'Medium' ? 1 : 0,
    low: audit.riskLevel === 'Low' ? 1 : 0,
  });

  const [findingsBreakdown, setFindingsBreakdown] = useState({
    outdated: findings.includes('Outdated') ? 1 : 0,
    nonCompliance: findings.includes('Non-compliance') ? 1 : 0,
    lackOfPolicies: findings.includes('Lack of policies') ? 1 : 0,
  });

  // Handler for graph input change
  const handleGraphChange = (field, value, graphType) => {
    if (graphType === 'risk') {
      setRiskLevels({ ...riskLevels, [field]: value });
    } else if (graphType === 'findings') {
      setFindingsBreakdown({ ...findingsBreakdown, [field]: value });
    }
  };

  const handleStatusChange = (e) => {
    setAuditStatus(e.target.value); // Update status locally
    audit.status = e.target.value; // Simulate saving to the backend or updating the data
  };

  const handleUpdate = () => {
    // Update audit details
    audit.findings = findings;
    audit.recommendations = recommendations;
    audit.riskLevel = riskLevels.high ? 'High' : riskLevels.medium ? 'Medium' : 'Low';
    alert('Audit details updated successfully!');
    navigate('/');
  };

  if (!audit) {
    return <p>No audit found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Audit Details for {audit.organization}</h2>
        <select
          value={auditStatus}
          onChange={handleStatusChange}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Audit Overview</h3>
          <p><strong>Audit Type:</strong> {audit.auditType}</p>
          <p><strong>Risk Level:</strong> {audit.riskLevel}</p>
          <p><strong>Auditor:</strong> {audit.auditor}</p>
          <p><strong>Audit Date:</strong> {audit.auditDate}</p>

          {/* Editable Fields */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Findings:</label>
            <textarea
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Recommendations:</label>
            <textarea
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Update Audit Details
            </button>
          </div>
        </div>

        {/* Risk Level Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Risk Level Distribution</h3>

          {/* Editable inputs for risk levels */}
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm">High Risk:</label>
              <input
                type="number"
                value={riskLevels.high}
                min={0}
                max={1}
                onChange={(e) => handleGraphChange('high', +e.target.value, 'risk')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm">Medium Risk:</label>
              <input
                type="number"
                value={riskLevels.medium}
                min={0}
                max={1}
                onChange={(e) => handleGraphChange('medium', +e.target.value, 'risk')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm">Low Risk:</label>
              <input
                type="number"
                value={riskLevels.low}
                min={0}
                max={1}
                onChange={(e) => handleGraphChange('low', +e.target.value, 'risk')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'High', value: riskLevels.high },
                  { name: 'Medium', value: riskLevels.medium },
                  { name: 'Low', value: riskLevels.low },
                ]}
                dataKey="value"
                outerRadius={100}
              >
                {COLORS.map((color, index) => (
                  <Cell key={index} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Findings Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Findings Breakdown</h3>

          {/* Editable inputs for findings */}
          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="block text-sm">Outdated Systems:</label>
              <input
                type="number"
                value={findingsBreakdown.outdated}
                min={0}
                onChange={(e) => handleGraphChange('outdated', +e.target.value, 'findings')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm">Non-compliance:</label>
              <input
                type="number"
                value={findingsBreakdown.nonCompliance}
                min={0}
                onChange={(e) => handleGraphChange('nonCompliance', +e.target.value, 'findings')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm">Lack of Policies:</label>
              <input
                type="number"
                value={findingsBreakdown.lackOfPolicies}
                min={0}
                onChange={(e) => handleGraphChange('lackOfPolicies', +e.target.value, 'findings')}
                className="border p-2 rounded-lg w-full"
              />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Outdated Systems', value: findingsBreakdown.outdated },
              { name: 'Non-compliance', value: findingsBreakdown.nonCompliance },
              { name: 'Lack of Policies', value: findingsBreakdown.lackOfPolicies },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AuditDetails;
