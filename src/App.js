import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HomePage from 'pages/HomePage'
import ShopPage from 'pages/Shop';
import SignInAndSignUpPage from 'pages/SignInAndSignUp';
import CheckoutPage from 'pages/CheckoutPage';
import Header from 'components/Header';
import { auth, createUserProfileDocument } from 'firebase/utils';
import { setCurrentUser } from 'redux/user/actions';
import { selectCurrentUser } from 'redux/user/selectors';
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
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => {
          return currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
        }} />
      </Switch>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = {
  setCurrentUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
