import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login/Login";
import NavBar from "./components/NavBar";
import Products from "./pages/products/Products";
import Requests from "./pages/requests/Requests";
import Users from "./pages/users/Users";


const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/products",
        element:<Products/>
    },
    {
        path: "/requests",
        element:<Requests/>
    },
    {
        path: "/users",
        element:<Users/>
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

