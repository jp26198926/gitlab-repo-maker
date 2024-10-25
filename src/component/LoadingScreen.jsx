import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function LoadingScreen() {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-500">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
}

export default LoadingScreen;
