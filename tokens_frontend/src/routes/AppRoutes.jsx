import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'
import Register from '../pages/Register'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Protected from './protected/Protected'
import Public from './protected/Public'
import { axiosInstance } from '../config/axiosInstance'
import { addUser, removeUser } from '../state/authReducer'

const AppRoutes = () => {
    console.log('appRoutes')
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                let res = await axiosInstance.get('/api/auth/me')
                dispatch(addUser(res?.data?.user))
            } catch (error) {
                dispatch(removeUser())
                console.log('error in /me api', error)
            }
        })()   // <-- was missing, so IIFE never ran
    }, [])


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