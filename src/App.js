import React from 'react';

// CSS
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';

// Plugins
// TODO 哈希路由 api 下拉刷新
import {HashRouter as Router, Link, Switch, Route, Redirect} from "react-router-dom";
import Cookies from 'js-cookie';

// Route
import Routers from './Routes';

function App() {
  let token = isLogged()

  return (
    <div className="App">
      <Router>
        <Switch>
          {
            Routers.map((item, index) => {
              return <Route key={index} path={item.path} exact
                            render={props => (!item.auth ? (<item.component {...props} />) : (token ?
                              <item.component {...props} /> :
                              <Redirect to={{pathname: '/login', state: {from: props.location}}}/>))}/>
            })
          }
        </Switch>
      </Router>
    </div>
  );
}

// is logged in
function isLogged(){
  if (Cookies.get('yiheng')) {
    return true
  }else{
    return false
  }
}

export default App;
