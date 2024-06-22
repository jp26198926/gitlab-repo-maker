import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function GroupDropdown() {
    const [isChecked, setIsChecked] = useState(false);
    const {state, dispatch} = useContext(AppContext);

    const toggleCheckbox = () => {
        if (isChecked){
            //will uncheck 
            setIsChecked(false);
            dispatch({type: "CLEAR_SELECTED_GROUP"});
        }else{
            setIsChecked(true);
        }        
    }

    const handleChange = (e) => {
        dispatch({type: "SET_SELECTED_GROUP", payload: e.target.value});
    }

    return (
        <div className="py-4">
            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="enableDropdown"
                    className="checkbox"
                    checked={isChecked}
                    onChange={toggleCheckbox}
                />
                <label htmlFor="enableDropdown"className="text-lg px-2">
                    Select a Group
                </label>
            </div>
            <select
                disabled={!isChecked}
                className={
                    `w-full p-2 border rounded ${isChecked ? 'bg-white' : 'bg-gray-200'}`
                }
                value={state.selectedGroup.id}
                onChange={handleChange}
            >
                <option value="0" disabled selected>Select a Group Here</option>
                {
                    state.groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name} [{group.path}]</option>
                    ))
                }
            </select>
            <p>SELECTED</p>
            <p>ID: {state.selectedGroup.id}</p>
        </div>
    )
}

export default GroupDropdown;