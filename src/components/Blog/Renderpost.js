import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import getAppTheme from '../Common/getAppTheme';
import { Post, sections, sidebar} from '../Interface/defaults';
import { useNavigate } from 'react-router-dom';

 
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(getAppTheme('light'));
  

function Renderpost (props){
    console.log("title: ",props.title);
    console.log("post: ",props.post?.posts);
    console.log("tagged_posts ",props.post?.taggedPosts);
    console.log("loading: ",props.loading);
    console.log("Error: ",props.error);
    let posts=[];
    if(props.post?.posts){
      if (Array.isArray(props.post?.posts)){
        props.post?.posts.forEach( (post) => {
                console.log("Post:-> ",post);
                posts.push(new Post(
                            {
                                title : post.title,
                                summary : post.summary,
                                date : post.date,
                                image : post.imgUrl,
                                author : post.author,
                                data :post.data,
                            }
                    ));
            }
        );
        //console.log("FEATURE-> ",featuredPost);
        }
        else{
            posts = [(new Post({
                                title : props.post?.posts.title,
                                summary : props.post?.posts.summary,
                                date : props.post?.posts.date,
                                image : props.post?.posts.imgUrl,
                                author : props.post?.posts.author,
                                data :props.post?.posts.data,
                                category : props.post?.posts.section,
                                tags : props.post?.posts.tags,
                                /*Feature added for comments*/
                                comments : props.post?.posts.comments,
                            }))];
        }
    }
    
    let taggedPosts = [];
    if(props.post?.taggedPosts){
      if (Array.isArray(props.post?.taggedPosts)){
        props.post?.taggedPosts.forEach( (post) => {
                console.log("Post:-> ",post);
                taggedPosts.push(new Post(
                            {
                                title : post.title,
                                summary : post.summary,
                                date : post.date,
                                image : post.imgUrl,
                                author : post.author,
                                data :post.data,
                            }
                    ));
            }
        );
        //console.log("FEATURE-> ",featuredPost);
        }
        else{
          taggedPosts = [(new Post({
                                title : props.post?.taggedPosts.title,
                                summary : props.post?.taggedPosts.summary,
                                date : props.post?.taggedPosts.date,
                                image : props.post?.taggedPosts.imgUrl,
                                author : props.post?.taggedPosts.author,
                                data :props.post?.taggedPosts.data,
                                category : props.post?.taggedPosts.section,
                                tags : props.post?.taggedPosts.tags,
                            }))];
        }
    }
    
    const navigate =useNavigate();

    if(props.singlePost){ //singlePOST
      console.log("RenderPost js Title: ",posts[0]?.title);
      console.log("RenderPost js Comments: ",posts[0]?.comments);
      sessionStorage.setItem('CurrentTitle',posts[0]?.title);
      sessionStorage.setItem('CurrentComments',JSON.stringify(posts[0]?.comments));  
    }
    return (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header title="Blog" sections={sections} top={'Home'} topFn = {()=>(navigate('/'))}/>
            <main>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main title={props.title} posts={posts} taggedPosts={taggedPosts} flag ={props.singlePost} loading={props.loading} error={props.error}/>
                <Sidebar
                  title={sidebar.title}
                  description={sidebar.description}
                  archives={sidebar.archives}
                  social={sidebar.social}
                />
              </Grid>
            </main>
          </Container>
          <Footer
            title="Footer"
            description="Something here to give the footer a purpose!"
          />
        </ThemeProvider>
      );
}

export default Renderpost;