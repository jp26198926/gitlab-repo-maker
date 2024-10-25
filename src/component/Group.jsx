import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import GroupTree from "./GroupTree";

function Group() {
  const [isChecked, setIsChecked] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    fetchGroups();
    if (state.selectedGroup.id > 0) setIsChecked(true);
  }, []);

  const toggleCheckbox = () => {
    if (isChecked) {
      //will uncheck
      setIsChecked(false);
      dispatch({ type: "CLEAR_SELECTED_GROUP" });
    } else {
      setIsChecked(true);
    }
  };

  const fetchGroups = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      //get top level group and return a max of 50000 records
      const response = await fetch(
        `${state.api}/groups?top_level_only=true&per_page=50000`,
        {
          headers: {
            Authorization: `Bearer ${state.token.trim()}`,
          },
        }
      );

      if (!response.ok) throw new Error("Unable to fetch groups");

      const results = await response.json();

      //fetch subgroups
      results.map(async (result) => {
        result.subgroups = await fetchSubGroups(result.id);
      });

      dispatch({ type: "GROUP_LIST", payload: results });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Unable to fetch groups";
      dispatch({ type: "ADD_ERROR", payload: errorMsg });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const fetchSubGroups = async (parentGroupID) => {
    try {
      const response = await fetch(
        `${state.api}/groups/${parentGroupID}/subgroups`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subgroups");
      }

      const subgroups = await response.json();

      const fetchAllSubGroups = async (subgroups) => {
        for (const subgroup of subgroups) {
          const subSubGroups = await fetchSubGroups(subgroup.id);
          subgroup.subgroups = subSubGroups;
        }
        return subgroups;
      };

      return fetchAllSubGroups(subgroups);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="enableDropdown"
          className="checkbox accent-indigo-800"
          checked={isChecked}
          onChange={toggleCheckbox}
        />
        <label htmlFor="enableDropdown" className="text-lg px-2">
          Select a Group
        </label>
      </div>

      {isChecked &&
        state.groups.map((group) => <GroupTree key={group.id} group={group} />)}

      <hr className="bg-indigo-900  my-3" />

      <p className="font-bold text-indigo-800">SELECTED</p>
      <p>ID: {state.selectedGroup?.id}</p>
      <p>NAME: {state.selectedGroup?.name}</p>
      <p>PATH: {state.selectedGroup?.path}</p>
    </div>
  );
}

export default Group;
