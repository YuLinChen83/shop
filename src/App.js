import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from 'pages/HomePage'
import ShopPage from 'pages/Shop';
import SignInAndSignUpPage from 'pages/SignInAndSignUp';
import Header from 'components/Header';
import { auth, createUserProfileDocument } from 'firebase/utils';
import { setCurrentUser } from 'redux/user/actions';
import './App.css';

const App = ({ currentUser, setCurrentUser }) => {
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
  }, [setCurrentUser])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={() => {
          return currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
        }} />
      </Switch>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = {
  setCurrentUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
