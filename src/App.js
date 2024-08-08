import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import UserProfile from './components/UserProfile/UserProfile';


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/newsletter" element={<SignIn />} />
        <Route path="/newsletter/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}
