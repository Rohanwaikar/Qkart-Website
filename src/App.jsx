 import Footer from './components/Footer';
import { loader as productsLoader } from './components/Products';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import { createBrowserRouter } from 'react-router-dom';
import { Outlet, RouterProvider } from 'react-router-dom';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';

const AppLayout = () => {
  return (
    <>
      
        <Outlet />
      <Footer />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Products />,
        loader: productsLoader,
        id: 'products',
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

function App() {

   return (
      <div className='App'>
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
