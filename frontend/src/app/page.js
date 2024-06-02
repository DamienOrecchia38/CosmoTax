'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

export default function Home() {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar 
        onLoginClick={() => {
          setShowLoginForm(true);
          setShowSignUpForm(false);
        }} 
        onSignUpClick={() => {
          setShowSignUpForm(true);
          setShowLoginForm(false);
        }} 
      />
      {showLoginForm && (
        <div className="min-h-screen flex items-center justify-center">
          <LoginForm />
        </div>
      )}
      {showSignUpForm && (
        <div className="min-h-screen flex items-center justify-center">
          <SignUpForm />
        </div>
      )}
    </div>
  );
}