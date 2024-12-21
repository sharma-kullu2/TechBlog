import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from '../Blog/Sidebar';
import Footer from '../Blog/Footer';
import ProfileCover from './ProfileCover';
import Redirect from '../Common/Redirect';
import Commonheader from '../Common/CustomHeader';
import getAppTheme from '../Common/getAppTheme';
import { Loading } from '../Graphics/Loading';


class Profile {
  constructor({username,email,authorized}){
    this.username = username;
    this.email = email;
    this.authrized = authorized;
  }
};
//function to check if user is already logged in
function UserProfile() {
  const theme = createTheme(getAppTheme('light'));
  const [userDetails, setUserDetails] = React.useState(null);
  const [userSignInAgain, setUserSignInAgain] = React.useState(true);
  //const [error, setError] = React.useState(null);


  React.useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        //setError('No token found. Please log in again.');
        console.log('No token found. Please log in again.');
        setUserSignInAgain(true);
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
            setUserSignInAgain(true);
            setUserDetails("Signed Out.... Sign in again!!");
          }
          else
          {
            setUserSignInAgain(false);
            const data = await response.json();
            console.log('Data: ',data);
            const profile = new Profile({
              username : sessionStorage.getItem('CurrentName'),
              email: sessionStorage.getItem('editorMail'),
              authorized : sessionStorage.getItem('editorAuth'),
            });
            console.log("profile  : ", profile);
            setUserDetails(profile);
          }
        } catch (error) {
          //setError(error.message);
          console.log('An error occurred. Please try again: log: ',error.message);
        }
      }
    };
    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return (
      <Loading/>
    );
  } else if (userSignInAgain) {
    localStorage.clear();
    return (
      <Redirect message={"You have been signed out"}/>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
          <Commonheader title={'Profile Page'} logout={true} />
                  <main>
                    <ProfileCover profile={userDetails}/>
                  </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
    );
  }
}

export default UserProfile;