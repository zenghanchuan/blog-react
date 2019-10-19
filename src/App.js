import React from "react";
import "./App.css";
import Firstpage from './pages/Firstpage';
import MainHome from './pages/MainHome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


function App() {
  return (
    <Router>
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Switch>
            <Route exact path='/' component={Firstpage} />
            <Route path='/homeTower' component={MainHome} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
