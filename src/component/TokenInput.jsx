import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TokenInput = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleChange = (event) => {
    dispatch({type: "SET_TOKEN", payload: event.target.value })
  };  

  return (
    <div className="w-full mx-auto mb-6 ">
      <div className="mb-4">          
          <input
            type="text"
            value={state.token}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-center border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your personal access token"
          />
        </div>
        
    </div>
  );
};

export default TokenInput;
