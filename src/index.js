import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login/Login";
import Products from "./pages/products/Products";
import Requests from "./pages/requests/Requests";
import Users from "./pages/users/Users";
import App from "./App";
import NavBar from "./components/NavBar";
import Profile from "./pages/profile/Profile";


const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element:<Login/>
            },
            {
                path: "/products",
                element:
                    <>
                        <NavBar/>
                        <Products/>
                    </>
            },
            {
                path: "/profile",
                element:
                    <>
                        <NavBar/>
                        <Profile/>
                    </>
            },
            {
                path: "/requests",
                element:
                    <>
                        <NavBar/>
                        <Requests/>
                    </>
            },
            {
                path: "/users",
                element:
                    <>
                        <NavBar/>
                        <Users/>
                    </>
            }
        ],
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

