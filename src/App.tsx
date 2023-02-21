/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component<{}, {host: string, test: string}> {
  constructor(props: any) {
    super(props)
    this.state = {
      host : '',
      test: '',
    }
  }

  componentDidMount() {
    this._dbTest();
  }
  
  _dbTest = async() => {
    const res = await axios.get('/api/test');
    console.log(res.data)
  }


  render() {
    return(
      <div className='App'>
        <h3> Welcome to <u> {this.state.host} </u> Blog! </h3>
      </div>
    )
  }
}

export default App;


