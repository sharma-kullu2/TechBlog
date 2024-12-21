import * as React from 'react';
import PropTypes from 'prop-types';
import {Grid,Typography,Divider,Stack,Link,Box,CircularProgress} from '@mui/material';
import Markdown from './Markdown';
import {SadDogIco} from '../Graphics/Icons';
import Comments from './Comments';
import FeaturedPost from './FeaturedPost';


function Main(props) {
  const { posts, title, flag, loading, error, taggedPosts} = props;
  console.log("Main js Comments: ",posts[0]?.comments);
  //following condition only works for single post
  const [comment, setComment] = React.useState(posts[0]?.comments);
  
  React.useEffect(()=>{
    //const Comments = sessionStorage.getItem('CurrentComments');
    if(!loading){
      //const CommentsJSON = JSON.parse(Comments);
      setComment(posts[0]?.comments);
      console.log("main:-> ",comment);
    }
  },[posts[0]?.comments]);
  
  // fn passed down as prop ; to be updated when comment is added
  //This approach adheres to React's unidirectional data flow, 
  //where state is managed in a parent component and updated using functions passed down to child components

  const updateComment = (newComment) => {
    setComment(newComment);
  };

  if(error){
    return (
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <Typography variant="h6" gutterBottom>
            No Posts Found !! 
        </Typography>
        <SadDogIco/>
      </Grid>
    );
  }
  if(loading){
    return (
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <CircularProgress sx={{ mt: 3 }} />
      </Grid>
    );
  }
  return (
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          '& .markdown': {
            py: 3,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
        <Stack direction ="column" spacing = {2}>
        {posts.map((post) => (
          <Markdown key={post.title} post={post} singlepost ={flag}/>
        ))}
        </Stack>
        <Divider />
        {flag &&
        (
          <Stack direction ="column" spacing = {2}>
          {taggedPosts?.length > 0 &&
          (
          <><Typography variant="h6" gutterBottom>
            Other Interesting Posts 
          </Typography>
          <Grid container spacing={4}>
            {taggedPosts?.map((post) => (
              <FeaturedPost key={post.title} post={post} apiloading={loading}/>
            ))}
          </Grid>
          <Divider/>
          </>)
          }
          <Comments comments={comment} updateComment={updateComment}/>
          </Stack>
        )
        }
      </Grid>
    );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
