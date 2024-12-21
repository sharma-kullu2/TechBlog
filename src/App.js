import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import UserProfile from './components/UserProfile/UserProfile';
import Interface from './components/Interface/interface';
import Navigation from './components/Common/Navigate';
import Authorized from './components/Common/Authorized';
import Editor from './components/Editor/Editor';


export default function App() {
  const [posts, setPosts] = React.useState([]);
  const [ApiLoading,setApiLoading] = React.useState(true);

  const getPosts = async() =>{
    try{
      const response = await fetch('/api/getpost', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({postTitle:"" ,postType:""})
        });

      //const data = await response.json();

      console.log('Response: ',response);
      
      if (response.ok) {
        // Handle response
        const data = await response.json(); // Assuming the token is returned as a plain text response
        console.log('data:', data);
        //
        console.log('example main post ', data.data.main)
        setPosts(data.data);
        sessionStorage.setItem('renderContent',JSON.stringify(data.data)); //will be clear once new post is saved
        setApiLoading(false);
        // 
      } else {
        //
        console.log('No OK response from server')
      }
    }
    catch(error) {
      //setError('An error occurred. Please try again.');
      console.log('An error occurred. Please try again.');
    }
  }

  React.useEffect(()=>{
    //check session storage
    const data = sessionStorage.getItem('renderContent');
    if(data){
      setPosts(JSON.parse(data));
      setApiLoading(false);
    }
    else{
      setApiLoading(true);
      getPosts();
    }
  },[]
  );

  return (
    <div>
      <Routes>
        <Route path="/" element={<Interface api={posts} postLoading={ApiLoading}/>} />
        <Route path="/newsletter" element={<SignIn />} />
        <Route path="/newsletter/signup" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/editor" element={<Authorized jsx={<Editor/>}/>}/>
        <Route path="/page" element={<Navigation />}/>
      </Routes>
    </div>
  );
}
