import React from 'react'
import { axiosInstance } from './config/axiosInstance'

const App = () => {

  let getData = async () =>{
    try {
      let res = await axiosInstance.get('/products')
      console.log(res)
    } catch (error) {
      console.log(`error in api`, error)
    }

  }

  getData()

  return (
    <div>
      <h1>Hey..</h1>
    </div>
  )
}

export default App