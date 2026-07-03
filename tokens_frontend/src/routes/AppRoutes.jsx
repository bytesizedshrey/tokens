import React from 'react'
import  {RouterProvider} from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'

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
        }
    ])

  return <RouterProvider router={router} />

}

export default AppRoutes