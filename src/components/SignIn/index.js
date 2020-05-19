import React, { useState } from 'react';
import FormInput from 'components/FormInput';
import CustomButton from 'components/CustomButton';
import { auth, signInWithGoogle } from 'firebase/utils';

import './index.scss';

const initForm = { email: '', password: '' };
const SignIn = () => {
  const [form, setForm] = useState(initForm);

  const handleChange = event => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = form;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setForm(initForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={form.email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={form.password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;