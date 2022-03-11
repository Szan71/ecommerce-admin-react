import './App.css';
import React from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './featured/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, Route, Router, Switch, Redirect} from "react-router-dom";import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginAction,logoutAction } from './store/action';


function App() {
  const token = useSelector((state)=>state.login);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(loginAction());
    }else{
      dispatch(logoutAction());
    }
  }, []);




  return (
    <BrowserRouter>
    <Switch>

      {/* <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} /> 
      <Route exact path="/home" component={Home} /> 
      <Route exact path="/register" component={Register} /> */}

      {token ? (
          <>
            <Route exact path="/home" component={Home}></Route>
            <Redirect from="*" to="/home"></Redirect>
          </>
        ) : (
          <>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Redirect from="*" to="/login"></Redirect>
          </>
        )}

    </Switch>
    </BrowserRouter>

  );
}



export default App;
