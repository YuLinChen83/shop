import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage'
import ShopPage from 'pages/Shop';
import SignInAndSignUpPage from 'pages/SignInAndSignUp';
import Header from 'components/Header';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/sign' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
}
export default App;
