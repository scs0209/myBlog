/* eslint-disable */
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState({ host: '' })

  useEffect(() => {
    axios.get('/api/host', {
      withCredentials: true
    }).then((res) => setData({host: res.data.host}))
  }, []);

  useEffect(() => {
    axios.get('/api/test', {
      withCredentials: true
    })
    .then((res) => console.log(res.data));
  }, []);
  
  return (
    <div className='App'>
      <h3>Welcome to <u>{data.host}</u> Blog! </h3>
    </div>
  )
}

export default App;


