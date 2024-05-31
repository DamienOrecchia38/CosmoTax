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
        <div className="flex justify-center items-center mt-12">
          <LoginForm />
        </div>
      )}
      {showSignUpForm && (
        <div className="flex justify-center items-center mt-8">
          <SignUpForm />
        </div>
      )}
    </div>
  );
}