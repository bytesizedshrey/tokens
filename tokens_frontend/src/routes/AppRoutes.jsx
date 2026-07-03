import React from 'react'
import  {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'
import Register from '../pages/Register'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Protected from './protected/protected'
import Public from './protected/Public'

const AppRoutes = () => {

    let router = createBrowserRouter([
        {
            path: "/",
            element: <Public />,
            children: [
              {
                element: <AuthLayout />,
                children: [
                  {
                    index: true,
                    element: <Login />,
                  },
                  {
                    path: "login",
                    element: <Login />,
                  },
                  {
                    path: "register",
                    element: <Register />,
                  },
                ],
              },
            ],
          },

        {
            path : "/home",
            element : <Protected/>,
            children : [
                {
                    path : "",
                    element : <MainLayout/>,
                    children : [
                        {
                            path : "",
                            element : <Home/>
                        }
                    ],
                }
            ]
        }
        ,
        {
            path : "*",
            element : <NotFound />
        }
    ])

  return <RouterProvider router={router} />

}

export default AppRoutes