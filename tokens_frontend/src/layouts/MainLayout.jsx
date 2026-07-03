import React from 'react'
import {Outlet} from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <div>Navbar</div>
        <Outlet/>
    </div>
  )
}

export default MainLayout