import React from 'react'
import {Outlet} from 'raect-router'

const AuthLayout = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthLayout