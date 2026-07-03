import React from 'react'
import axios from 'axios'

const App = () => {

  let getData = async () =>{
    try {
      let res = await axios.get('')
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