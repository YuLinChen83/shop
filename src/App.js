import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage'
import ShopPage from 'pages/Shop';
import SignInAndSignUpPage from 'pages/SignInAndSignUp';
import Header from 'components/Header';
import { auth, createUserProfileDocument } from 'firebase/utils';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    let unsubscribeFromAuth;
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth = null;
    }
  }, [])
  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
}
export default App;
