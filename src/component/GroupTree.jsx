import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

function GroupTree({ group }) {
    const [subGroups, setSubGroups] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        if (isExpanded && subGroups.length === 0) {
            fetchSubGroups();
        }
    }, [isExpanded]);

    const fetchSubGroups = async () => {
        try {
            const response = await fetch(`${state.api}/groups/${group.id}/subgroups`, {
                headers: {
                    'Authorization': `Bearer ${state.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch subgroups');
            }

            const data = await response.json();
            setSubGroups(data);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSelect = (e) => {        
        dispatch({type: "SET_SELECTED_GROUP", payload: group})
    }

    return (
        <div className="ml-4 mt-2">
            <div className="flex items-center cursor-pointer" >
                <button onClick={toggleExpand} className="mr-2">
                    {isExpanded ? '-' : '+'}
                </button>
                <span
                    onClick={handleSelect} 
                    className={`${state.selectedGroup.id == group.id && 'bg-purple-800 px-3 py-1 rounded text-white'}`}
                >
                    {group?.name}
                </span>
            </div>
            {isExpanded && subGroups.length > 0 && (
                <div className="ml-4">
                    {subGroups.map((subgroup) => (
                        <GroupTree key={subgroup.id} group={subgroup} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GroupTree;
