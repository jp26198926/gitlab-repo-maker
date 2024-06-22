import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function GreenMessage() {
    const {state} = useContext(AppContext);

    return (
        <>
            {
                state.successMessages.length > 0 ? 
                (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <ul className="list-disc pl-5">
                            {state.successMessages.map((message, idx) => (
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

export default GreenMessage