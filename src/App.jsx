import { useState } from 'react';
import { Helmet } from 'react-helmet'
import Stepper from './component/Stepper';
import LoadingScreen from './component/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>GBRM</title>
      </Helmet>  
      {loading && <LoadingScreen />}
      <div className="p-8">
        <h1 className="flex justify-center text-5xl text-center mb-6 text-indigo-800">Gitlab Bulk Repository Maker</h1>
        <Stepper  />
      </div>
    </>    
  );
}

export default App
