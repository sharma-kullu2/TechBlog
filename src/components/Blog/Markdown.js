import * as React from 'react';
import {Typography,Link,Box,Paper,Card,CardContent,CardActions} from '@mui/material';
import EditorContent from '../Render/Content';
import { Link as RouterLink } from 'react-router-dom';





function Markdown({post , singlepost}) {
  return(
    <>
      {!singlepost ?
        (<Card variant="outlined"
        >
           <CardContent>
              <Typography component="h1" variant="h5" color="inherit" gutterBottom>
              {post.title}
              </Typography>  
              <Box
                sx={{
                  width: '100%', // Set the desired width
                  maxHeight: '300px', // Set a specific height or maxHeight
                  overflow: 'hidden', // Hides any overflowed content
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent)',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                <EditorContent data={post.data} />
              </Box>
        </CardContent>
        <CardActions>
          <Link variant="subtitle1" component={RouterLink} to={`/page?title=${post.title}`}>
            {post.linkText}
          </Link>
        </CardActions>
      </Card>)
      :
        (
        <Paper>
          <Box
            sx={{
              width: '100%', // Set the desired width
              //border :1,
              p:1,
            }}
        >
          <EditorContent data={post.data} />
        </Box>
        </Paper>
        )
      }
    </>
  );
}

export default Markdown;
