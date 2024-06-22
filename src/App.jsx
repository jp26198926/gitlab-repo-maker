
import { Helmet } from 'react-helmet'
import Stepper from './component/Stepper';
import Test from './component/Test';

const App = () => {
  
  return (
    <>
      <Helmet>
        <title>GBRM</title>
      </Helmet>  
      <div className="p-8">
        <h1 className="flex justify-center text-5xl text-center mb-6 text-purple-800">Gitlab Bulk Repository Maker</h1>
        <Stepper  />
      </div>
    </>    
  );
}

export default App
