import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HomePage from 'pages/HomePage'
import ShopPage from 'pages/Shop';
import SignInAndSignUpPage from 'pages/SignInAndSignUp';
import CheckoutPage from 'pages/Checkout';
import Header from 'components/Header';
import { auth, createUserProfileDocument, addCollectionsAndDocuments } from 'firebase/utils';
import { setCurrentUser } from 'redux/user/actions';
import { selectCurrentUser } from 'redux/user/selectors';
import { selectCollectionsForPreview } from 'redux/shop/selectors';
import './App.css';

const App = ({ currentUser, setCurrentUser, collectionsArray }) => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
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
      addCollectionsAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    });
    return () => {
      unsubscribeFromAuth = null;
    }
  }, [collectionsArray, setCurrentUser])

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
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = {
  setCurrentUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
