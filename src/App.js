import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import RoomList from './components/RoomList';
import Chat from './components/Chat';
import Header from './components/Header'

class App extends React.Component {
  state = {
    population: [],
    name: ''
  };
  updateState = (state) => this.setState({...state});
  componentDidMount(){
    const a = (obj) => {
      fetch('/api/population', { method: 'GET' })//https://127.0.0.1:3001
          .then(function (response) {
            return response.json();
          })
          .then(function (population) {
            obj.setState({population});
          })
    };
    a(this);
  }
  render() {
    return (
      <div className="App">
        <Header onUpdateState = { this.updateState } />
        <div style={ { height: window.innerHeight - 200 } }>
          <Switch>
            <Route exact path='/' component={ props => <RoomList { ...props } population={this.state.population} name={ this.state.name }/>}/>
            <Route path='/chat/:port/:name' component={Chat}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
