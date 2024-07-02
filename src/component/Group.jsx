import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import GroupTree from "./GroupTree";

function Group() {
    const [isChecked, setIsChecked] = useState(false);
    const {state, dispatch} = useContext(AppContext);

    useEffect(()=>{
        dispatch({type: "CLEAR_SELECTED_GROUP"});
        getGroups();
    },[]);

    const toggleCheckbox = () => {
        if (isChecked){
            //will uncheck 
            setIsChecked(false);
            dispatch({type: "CLEAR_SELECTED_GROUP"});
        }else{
            setIsChecked(true);
        }        
    }

    // const handleChange = (e) => {
    //     dispatch({type: "SET_SELECTED_GROUP", payload: e.target.value});
    // }

    const getGroups = async () => {
        try{
          const response = await fetch(`${state.api}/groups?per_page=50000`, {    
            headers: {
              "Authorization" : `Bearer ${state.token.trim()}`
            }
          });
    
          if (!response.ok) throw new Error("Unable to fetch groups");
          
          const data = await response.json();
          const parentGroup = data.filter(group => !group.parent_id);
          
          dispatch({type: "GROUP_LIST", payload: parentGroup});
    
        }catch(error){
          const errorMsg = error.response?.data?.message || "Unable to fetch groups";
          dispatch({type: "ADD_ERROR", payload: errorMsg })
        }
    }

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
                <label htmlFor="enableDropdown"className="text-lg px-2">
                    Select a Group
                </label>
            </div>
            {/* <select
                disabled={!isChecked}
                className={
                    `w-full p-2 border rounded ${isChecked ? 'bg-white' : 'bg-gray-200'}`
                }
                value={state.selectedGroup.id}
                onChange={handleChange}
            >
                <option value="0" disabled>Select a Group Here</option>
                {
                    state.groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name} [{group.path}]</option>
                    ))
                }
            </select> */}
            

            {
                isChecked && state.groups.map(group => (                    
                    <GroupTree key={group.id} group={group} />
                ))
            }

            <hr  className="bg-indigo-900  my-3"/>

            <p className="font-bold text-indigo-800">SELECTED</p>
            <p>ID: {state.selectedGroup?.id}</p>
            <p>NAME: {state.selectedGroup?.name}</p>
            <p>PATH: {state.selectedGroup?.path}</p>
        </div>
    )
}

export default Group;