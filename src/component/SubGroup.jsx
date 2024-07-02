// src/components/SubgroupForm.js
import React, { useState } from 'react';

const Subgroup = () => {
  const [subgroupName, setSubgroupName] = useState('');
  const [path, setPath] = useState('');
  const [autoDevops, setAutoDevops] = useState(false);
  const [createLevel, setCreateLevel] = useState('maintainer');
  const [visibility, setVisibility] = useState('private');
  const [subgroups, setSubgroups] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddSubgroup = (e) => {
    e.preventDefault();
    // Check if the name or path already exists
    const nameExists = subgroups.some(subgroup => subgroup.subgroupName === subgroupName);
    const pathExists = subgroups.some(subgroup => subgroup.path === path);

    if (nameExists || pathExists) {
      setErrorMessage('Subgroup name or path already exists.');
      return;
    }

    const newSubgroup = {
      subgroupName,
      path,
      autoDevops,
      createLevel,
      visibility,
    };
    setSubgroups([...subgroups, newSubgroup]);
    setSubgroupName('');
    setPath('');
    setAutoDevops('');
    setCreateLevel('');
    setVisibility('');
    setErrorMessage('');
  };

  const handleDeleteSubgroup = (index) => {
    const newSubgroups = subgroups.filter((_, i) => i !== index);
    setSubgroups(newSubgroups);
  };

  const handleSubgroupNameChange = (e) => {
    const name = e.target.value;
    setSubgroupName(name);
    setPath(name.toLowerCase().replace(/.\s+/g, '-'));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Form Column */}
        <div>
          <form className="space-y-4" onSubmit={handleAddSubgroup}>
            <div>
              <label className="block text-sm font-medium text-gray-700">GitLab Subgroup Name</label>
              <input
                type="text"
                value={subgroupName}
                onChange={handleSubgroupNameChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Path</label>
              <input
                type="text"
                value={path}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isCollapsed ? 'Show Advanced Options' : 'Hide Advanced Options'}
            </button>
            {!isCollapsed && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Auto DevOps</label>
                  <select
                    value={autoDevops}
                    onChange={(e) => setAutoDevops(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Create Level</label>
                  <select
                    value={createLevel}
                    onChange={(e) => setCreateLevel(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Maintainer">Maintainer</option>
                    <option value="Developer">Developer</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to List
            </button>
          </form>
        </div>

        {/* Table Column */}
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Subgroup Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subgroups.map((subgroup, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subgroup.subgroupName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteSubgroup(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subgroup;
