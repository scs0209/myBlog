/* eslint-disable */
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState({ host: '' })

  useEffect(() => {
    axios.get('/api/host').then((res) => setData({host: res.data.host}))
  }, [])
  
  return (
    <div className='App'>
      <h3>Welcome to <u>{data.host}</u> Blog! </h3>
    </div>
  )
}

export default App;


