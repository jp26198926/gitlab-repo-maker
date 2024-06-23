import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import TokenInput from './TokenInput';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import Group from './Group';

const steps = [
  {
    step_no: 1, 
    component: TokenInput, 
    descriptions: ["Enter Personal Access Token. Get/Create it from Gitlab Account"]
  },
  {
    step_no: 2, 
    component: Group,
    descriptions: [
      "Select a group. (If not exist, you need to manually create it in the Gitlab)", 
      "If you don't want the have in a group, just unchecked 'Select a group'."
    ]
  },
  {
    step_no: 4, 
    descriptions: ["Enter Personal Access Token. Get/Create it from Gitlab Account"]
  },
  {
    step_no: 5, 
    descriptions: ["Enter Personal Access Token. Get/Create it from Gitlab Account"]
  },
  {
    step_no: 6, 
    descriptions: ["Enter Personal Access Token. Get/Create it from Gitlab Account"]
  }
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {state, dispatch} = useContext(AppContext);

  const checkToken = async () => {
    try{
      const response = await fetch(`${state.api}/user`, {
        headers: {
          "Authorization" : `Bearer ${state.token.trim()}`
        }
      });

      if (!response.ok) throw new Error("Invalid Token");
      
      return true;

    }catch(error){
      const errorMsg = error.response?.data?.message || "Invalid Token";
      dispatch({type: "ADD_ERROR", payload: errorMsg })
    }
  }  

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      //clear messages e.g error or success msgs
      dispatch({type: "CLEAR_MESSAGES"});
      
      //first Step
      if (currentStep === 0) { 
        const validToken = await checkToken();

        if (validToken) setCurrentStep(currentStep + 1);

      }else{
        setCurrentStep(currentStep + 1);
      }      
    }
  };

  const handlePrevious = () => {    
    if (currentStep > 0) {
      //clear messages e.g error or success msgs
      dispatch({type: "CLEAR_MESSAGES"});

      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div
              className={
                `flex items-center 
                justify-center w-10 h-10 
                mx-auto rounded-full text-white 
                ${
                  index <= currentStep ? 'bg-purple-800' : 'bg-gray-300'
                }`
              }
            >
              {index + 1}
            </div>           
          </div>
        ))}
      </div>
      <div className="text-left mb-4">
        <h2 className="text-xl font-semibold">Step {steps[currentStep].step_no}</h2>
        {
          steps[currentStep].descriptions.map((msg, idx) => (
            <p key={idx} className="mt-2 text-gray-600">{msg}</p>
          ))
        }        
      </div>

      <ErrorMessage />
      <SuccessMessage />

      {StepComponent && <StepComponent group={state.selectedGroup} />}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-purple-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
