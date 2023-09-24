import './App.scss';
import Products from './components/products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer />
      <div className=''>
        <Products />
      </div>
    </>
  );
}

export default App;
