import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import RoomList from './components/RoomList';
import Chat from './components/Chat';
import Header from './components/Header'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={RoomList}/>
          <Route path='/chat/:port' component={Chat}/>
        </Switch>
      </div>
    );
  }
}

export default App;
