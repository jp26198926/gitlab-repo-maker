import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Summary() {
  const { state, dispatch } = useContext(AppContext);

  const handleGenerate = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    for (const subgroup of state.subgroups) {
      await createSubgroup(subgroup);
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

  const createSubgroup = async (subgroup) => {
    try {
      const response = await fetch(`${state.api}/groups/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": `${state.token}`,
        },
        body: JSON.stringify(subgroup),
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      dispatch({
        type: "ADD_SUCCESS",
        payload: `Subgroup Created: ${result.name}`,
      });

      //create project under the newly create subgroup
      for (const project of state.projects) {
        await createProject(result, project);
      }
    } catch (error) {
      dispatch({
        type: "ADD_ERROR",
        payload: `Error creating Subgroup: ${error.message}`,
      });
    }
  };

  const createProject = async (subGroup, project) => {
    try {
      //add group id to the project object
      project.namespace_id = subGroup.id;

      const response = await fetch(`${state.api}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PRIVATE-TOKEN": `${state.token}`,
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      dispatch({
        type: "ADD_SUCCESS",
        payload: `Project created under ${subGroup.name}: ${result.name}`,
      });
    } catch (error) {
      dispatch({
        type: "ADD_ERROR",
        payload: `Error creating project: ${error.message}`,
      });
    }
  };

  return (
    <div>
      <h1 className="text-lg mt-2 font-bold">Parent Group:</h1>
      <p className="ps-5 text-indigo-500">Name: {state.selectedGroup.name}</p>

      <h1 className="text-lg mt-2 font-bold">SubGroups:</h1>
      <ol className="list-decimal list-inside">
        {state.subgroups.map((subgroup, idx) => (
          <li key={idx} className="ps-5 text-indigo-500">
            {" "}
            {subgroup.name}
          </li>
        ))}
      </ol>

      <h1 className="text-lg mt-2 font-bold">Projects:</h1>
      <ol className="list-decimal list-inside">
        {state.projects.map((project, idx) => (
          <li key={idx} className="ps-5 text-indigo-500">
            {" "}
            {project.name}
          </li>
        ))}
      </ol>

      <div className="text-center">
        <button
          onClick={handleGenerate}
          className="p-3 rounded text-white bg-indigo-500"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default Summary;
