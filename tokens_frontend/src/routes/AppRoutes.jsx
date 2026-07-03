import React from 'react'
import  {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'
import Register from '../pages/Register'
import Home from '../pages/Home'

const AppRoutes = () => {

    let router = createBrowserRouter([
        {
            path:"/",
            element:<AuthLayout/>,
            children : [
                {
                    path : '',
                    element : <Login/>
                },
                {
                    path : "register",
                    element : <Register/>
                }
            ]
        },

        {
            path : "/home",
            element : <MainLayout/>,
            children : [
                {
                    path : "",
                    element : <Home/>
                }
            ]
        }
    ])

  return <RouterProvider router={router} />

}

export default AppRoutes