import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import authContext from "./AuthContext";
import { CartContext } from "./CartContext";
import CartItems from "./components/CartItems";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from "./pages/MyOrders";
import OrderTable from "./components/OrderTable";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart,setCart] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <SignIn />,
        },{
          path: "/cart",
          element: <CartItems />
        },{
          path : "/orders",
          element : <MyOrders />
        }
      ],
    },
  ]);

  return (
    <CartContext.Provider value={{cart,setCart}} >
    <authContext.Provider value={{isLoggedIn,setIsLoggedIn}} >
    <RouterProvider router={router} />
    <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </authContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
