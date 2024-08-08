import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

//function to check if user is already logged in
function UserProfile() {
  
  const [userDetails, setUserDetails] = React.useState(null);
  const [userSignInAgain, setUserSignInAgain] = React.useState(true);
  //const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userlogout = () =>{
    localStorage.clear();
    navigate('/');  // Redirect to home page
  }

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        //setError('No token found. Please log in again.');
        console.log('No token found. Please log in again.');
        setUserSignInAgain(true)
      }
      else{
        try {
          const response = await fetch('/api/getProfile', {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
          });

          console.log('Response: ',response);

          if (!response.ok) {
            setUserSignInAgain(true)
          }
          else
          {
            setUserSignInAgain(false)
            const data = await response.json();
            console.log('Data: ',data)
            setUserDetails(data.data);
          }
        } catch (error) {
          //setError(error.message);
          console.log('An error occurred. Please try again.');
        }
      }
    };
    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  if (userSignInAgain){
    return (<div>
      Signed Out....  Sign in again!!
      <Button 
        variant="contained"
        onClick={userlogout}
      >
        Home
      </Button>
    </div>
    )
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>User ID: {userDetails.email}</p>
      <p>Email: {userDetails.email}</p>
      <p>Username: {userDetails.username}</p>
      <Button 
        variant="contained"
        onClick={userlogout}
      >
        Logout
      </Button>
    </div>
  );


}

export default UserProfile;