import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

//function to check if user is already logged in
function UserInfo() {
  const [userSignedIn, setuserSignedIn] = useState(false);
  //check local storage if email/token is present 
  // Function to check if user is signed in
  const isUserSignedIn = () => {
    const token = localStorage.getItem('authToken');
    
    return token !== null;
  };

  // Use effect to check on component mount
  useEffect(() => {
    if (isUserSignedIn()) {
      // User is signed in
      console.log("User is signed in");
      setuserSignedIn(true);
      // Perform actions for signed-in user
    } else {
      // @Todo Also check auth folder
      // User is not signed in
      console.log("User is not signed in");
      // Redirect to login page or show login modal
    }
  }, []);

  return (
    <div>
      {userSignedIn ? (
        // Render this if user is signed in
        <RouterLink to="/profile">
        <Button variant="outlined" size="small" >
          My Profile
        </Button>
        </RouterLink>
      ) : (
        // Render this if user is not signed in
        <RouterLink to="/newsletter">
        <Button variant="outlined" size="small" >
          Sign up/ Sign in
        </Button>
        </RouterLink>
      )}
    </div>
  );
}

export default UserInfo;