import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function ErrorMessage() {
    const {state} = useContext(AppContext);
    
    return (
        <>
            {
                state.errorMessages.length > 0 ? 
                (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <ul className="list-disc pl-5">
                            {state.errorMessages.map((message, idx) => (
                                <li key={idx}>{message}</li>                            
                            ))}
                        </ul>
                    </div>
                ):
                ("")                
            }
        </>
        
    )
}

export default ErrorMessage