import React from 'react';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import './index.scss';

const SignInAndSignUpPage = () => (
  <div className='sign-in-and-sign-up'>
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
