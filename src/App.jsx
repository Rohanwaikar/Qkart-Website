 import Footer from './components/Footer';
import { loader as productsLoader } from './components/Products';
import Products from './components/Products';
import { createBrowserRouter } from 'react-router-dom';
import { Outlet, RouterProvider } from 'react-router-dom';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';

const AppLayout = () => { // This component serves as the main layout for the application
  // It includes the Outlet component to render child routes and the Footer component
  return (
    <>
      
        <Outlet />  {/* Outlet is used to render the child routes defined in the router */}
      <Footer /> {/* Footer component is included at the bottom of the layout */}
    </>
  );
};

export const router = createBrowserRouter([ // This creates a browser router for the application
  // The router defines the routes for the application, including the main layout and child routes
  {
    path: '/', // The root path of the application
    element: <AppLayout />, // The main layout component that includes the Outlet and Footer
    children: [ // Child routes that will be rendered within the AppLayout
      {
        path: '/', // The root path will render the Products component
        element: <Products />, // The Products component will be rendered at the root path
        loader: productsLoader, // The loader function for the Products component to fetch data
        id: 'products', // Unique identifier for the Products route
      },
      {
        path: '/checkout', // The /checkout path will render the Checkout component
        element: <Checkout />, // The Checkout component will be rendered at the /checkout path
      },
      {
        path: '/register', // The /register path will render the Register component
        element: <Register />, // The Register component will be rendered at the /register path
      },
      {
        path: '/login', // The /login path will render the Login component
        element: <Login />, // The Login component will be rendered at the /login path
      },
    ],
  },
]);

function App() { // This is the main App component that renders the application
  // It uses the RouterProvider to provide the router to the application
  // The router is created using createBrowserRouter and defines the routes for the application

   return (
      <div className='App'> {/* Main application container */}
         <RouterProvider router={router} /> {/* RouterProvider is used to provide the router to the application */}
      </div>
   );
}

export default App; // Exporting the App component as the default export of this module
