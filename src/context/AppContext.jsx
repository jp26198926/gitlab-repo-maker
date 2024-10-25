import { createContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
    api: "https://gitlab.com/api/v4",
    token: import.meta.env.VITE_ACCESS_TOKEN || "",
    groups: [],
    selectedGroup: {id:0},
    subgroups: [],
    projects: [],
    errorMessages: [],
    successMessages: [],
    loading: false,
    treeViews: []
}

const appReducer = (state, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {...state, token: action.payload }
        case "CHECK_TOKEN":
            return {...state}
        case "CLEAR_MESSAGES":
            return {...state, errorMessages: [], successMessages: []}
        case "ADD_ERROR":            
            return {...state, errorMessages: [...state.errorMessages, action.payload]}
        case "ADD_SUCCESS":
            return {...state, successMessages: [...state.successMessages, action.payload]}
        case "SET_LOADING":
            return {...state, loading: action.payload}

        //GROUP
        case "GROUP_LIST":
            return {...state, groups: action.payload}
        case "SET_SELECTED_GROUP":
            return {...state, selectedGroup: action.payload}
        case "CLEAR_SELECTED_GROUP":
            return {...state, selectedGroup: {id: 0}}

        //SUBGROUP        
        case "SUBGROUP_ADD":
            return {...state, subgroups: [...state.subgroups, action.payload]}
        case "SUBGROUP_DELETE":
            const updatedSubGroups = state.subgroups.filter((_, i) => i !== action.payload);
            return {...state, subgroups: updatedSubGroups}
        case "SUBGROUP_CLEAR":
            return {...state, subgroups:[]}
        
        //PROJECTS      
        case "PROJECT_ADD":
            return {...state, projects: [...state.projects, action.payload]}
        case "PROJECT_DELETE":
            const updatedProjects = state.projects.filter((_, i) => i !== action.payload);
            return {...state, projects: updatedProjects}
        case "PROJECT_CLEAR":
            return {...state, projects:[]}

        
        //TREEVIEWS
        case "TREEVIEW_SET":
            return {...state, treeViews: action.payload}       
        case "TREEVIEW_CLEAR":
            return {...state, treeViews: []}
        
        default:
            return state;
    }
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };