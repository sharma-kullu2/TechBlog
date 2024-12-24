import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import getAppTheme from '../Common/getAppTheme';
import {sections , sidebar, title} from '../Interface/defaults';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(getAppTheme('light'));

export default function Blog(props) {
  console.log("PROPS_MAIN: ",props.main);
  console.log("main api laoding: ",props.apiLoading);
  console.log("PROPS_FEATURE: ",props.feature);
  console.log("PROPS_POST: ",props.posts);
  
  const [subscribed, setSubscribed] = React.useState('Subscribe');
  
  React.useEffect( () =>{
    const userSubscribed = sessionStorage.getItem('CurrentSubscribed')
    console.log("BLOG susbscribed->",userSubscribed );
    if (userSubscribed === 'true') //is true (string type)
    {
      setSubscribed('Subscribed');
    }
  },[subscribed]);

  const subscribeHandler = async() =>{
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No token found. Please log in again.');
      /* Redirect to signin page 
      */
    }
    else{
      if (subscribed === 'Subscribe')
      {
        try{
          const response = await fetch('/api/getProfile', {
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscribe:true}),
          });
          console.log('Response: ',response);
          if(response.ok){
            const data = await response.json();
            console.log('Data->',data);
            setSubscribed('Subscribed');
            sessionStorage.setItem('CurrentSubscribed',true);
          }
          else{
            console.log('API failed');
          }
        }
        catch(error){
          console.log("subscribe handler error: ",error.message);
        }
      }
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={sections} top={subscribed} topFn = {subscribeHandler} />
        <main>
          <MainFeaturedPost post={props.main} apiloading={props.apiLoading}/>
          <Grid container spacing={4}>
            {props.feature.map((post) => (
              <FeaturedPost key={post.title} post={post} apiloading={props.apiLoading}/>
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Latest in the posts" posts={props.posts} loading={props.apiLoading}/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
}
