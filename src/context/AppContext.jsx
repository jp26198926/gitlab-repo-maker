import { createContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
    api: "https://gitlab.com/api/v4",
    token: import.meta.env.VITE_ACCESS_TOKEN || "",
    groups: [],
    selectedGroup: {id:0},
    // selectedParentGroup: {id:0},
    subgroups: [],
    repositories: [],
    errorMessages: [],
    successMessages: [],
    loading: false,
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
            return {...state, loading: true}

        //GROUP
        case "GROUP_LIST":
            return {...state, groups: action.payload}
        case "SET_SELECTED_GROUP":
            return {...state, selectedGroup: action.payload}
        case "CLEAR_SELECTED_GROUP":
            return {...state, selectedGroup: {id: 0}}

        
        
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