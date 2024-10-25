import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Project = () => {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [autoDevops, setAutoDevops] = useState(false);
  const [visibility, setVisibility] = useState("private");
  const [mergeApprovalCount, setMergeApprovalCount] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddProject = (e) => {
    e.preventDefault();
    // Check if the name or path already exists
    const nameExists = state.projects.some((project) => project.name === name);
    const pathExists = state.projects.some((project) => project.path === path);

    if (nameExists || pathExists) {
      setErrorMessage("Project name or path already exists.");
      return;
    }

    const newProject = {
      name,
      path,
      description,
      auto_devops_enabled: autoDevops,
      approval_before_merge: mergeApprovalCount,
      initialize_with_readme: true,
    };
    dispatch({ type: "PROJECT_ADD", payload: newProject });
    setName("");
    setPath("");
    setDescription("");
    setErrorMessage("");
  };

  const handleDeleteProject = (index) => {
    dispatch({ type: "PROJECT_DELETE", payload: index });
  };

  const handleProjectNameChange = (e) => {
    const projectName = e.target.value;
    setName(projectName);
    setPath(
      projectName
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
    );
  };

  const handleClearList = () => {
    dispatch({ type: "PROJECT_CLEAR" });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Form Column */}
        <div>
          <form className="space-y-4" onSubmit={handleAddProject}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleProjectNameChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Path
              </label>
              <input
                type="text"
                value={path}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 bg-gray-100 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full bg-gray-300 text-black py-2 px-4 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {isCollapsed ? "Show Advanced Options" : "Hide Advanced Options"}
            </button>
            {!isCollapsed && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Auto DevOps Enabled
                  </label>
                  <select
                    value={autoDevops}
                    onChange={(e) => setAutoDevops(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Visibility
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Merge Approval Count
                  </label>
                  <input
                    type="text"
                    value={mergeApprovalCount}
                    onChange={(e) => setMergeApprovalCount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 bg-gray-100 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                  Project Name
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
              {state.projects.map((project, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {
            //if list is not empty show clear button
            state.projects.length > 0 && (
              <button
                type="button"
                onClick={handleClearList}
                className="w-full bg-red-100 text-red-800 py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear the List
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Project;
