import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import './Profile.css';
import './Navbar.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
// import About from './Components/About';
import Notifications from "./components/Notifications"
import Chat from "./components/chat/Chat"
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest } render={(props) => {
    return user ? <Component { ...rest } { ...props }/> : <Redirect to="/login" />
  }}/>
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  



  useEffect(() => {

    let token;
    // if there is no token in localStorage, then the user is in authenticated
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    // console.log('nowCurentUser is here...');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    const info = {
      email: currentUser.email,
      online: false
    }
    Axios.post(`${REACT_APP_SERVER_URL}/api/users/profile/status`, info)
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
      return  <Redirect to="/" />
    }
  }

  const notification = currentUser ? `/chat/${currentUser.id}` : null

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} user={currentUser} />
      <div className="container mt-5">
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route exact path="/" component={LandingPage} />
          <Route 
            path='/login' 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} />
          {/* <PrivateRoute path="/profile" component={ Profile } user={currentUser}/> */}
          <Route exact path="/chat" component={Chat} user={currentUser}/>
          <PrivateRoute exact path="/chat/:roomId" component={Notifications}  user={currentUser} />
         
        
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;