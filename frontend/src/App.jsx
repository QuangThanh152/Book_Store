import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvide } from './context/AuthContext';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify

function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <main className='min-h-screen px-4 py-6 mx-auto max-w-screen-2xl font-primary'>
          <Outlet />
        </main>
        <Footer />
        {/* Thêm ToastContainer ở đây */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      </AuthProvide>
    </>
  );
}

export default App;
