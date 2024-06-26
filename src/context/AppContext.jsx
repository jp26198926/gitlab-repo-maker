import { createContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
    api: "https://gitlab.com/api/v4",
    token: "glpat-eyU7YcBzJ1i7bNfUYWa9",
    groups: [],
    selectedGroup: {id:0},
    // selectedParentGroup: {id:0},
    subgroups: [],
    repositories: [],
    errorMessages: [],
    successMessages: []
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