import * as React from 'react';
import {Button,Box,TextField} from '@mui/material';
import {CommentEntity,CommentObject} from './AddCommentUtility';

function CommentAdd({isMain, child, childId, updateComment , replying, setReplying}){
    const [comment, setComment] = React.useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const createComment = (cmnt, name, likes) =>{
    const commentEntity = new CommentEntity({
        content: cmnt,
        likes : likes,
      });

    const commentObject = new CommentObject({
        username: name,
        comment: commentEntity,
      });

    return commentObject;
  };

  const onSubmit = (cmnt) => {
    const parent = sessionStorage.getItem('CurrentComments');
    const title = sessionStorage.getItem('CurrentTitle');
    const username = sessionStorage.getItem('CurrentName');
    //@Todo 
    //add logic to add guest at random in case username is null
    if(!username){
      username = "Guest"
    }
    console.log("Title:", title);
    console.log("Parent:", parent, "Type:", typeof parent);
    
    if (isMain) {
      if (parent && parent !== 'null') {
        try {
          const parsedParent = JSON.parse(parent);
          //console.log("Parent:", parsedParent);
          //console.log("Adding the comment to the Parent");          
          const commentObj = createComment(cmnt,username,[]);

          parsedParent.push(commentObj);
          //console.log("Updated Parent:", parsedParent);
          sessionStorage.setItem('CurrentComments', JSON.stringify(parsedParent));
          //console.log("New Comment:", commentObjectArr);
          //console.log("Checking session storage:", sessionStorage.getItem('CurrentComments'));
          updateComment(JSON.stringify(parsedParent));
        } catch (error) {
          console.error("Error parsing parent:", error);
        }
      } else {
        //console.log("New parent: Adding the comment");
        const commentObj = createComment(cmnt,username,[]);
        const commentObjectArr = [commentObj];
        sessionStorage.setItem('CurrentComments', JSON.stringify(commentObjectArr));
        //console.log("New Comment:", commentObjectArr);
        //console.log("Checking session storage:", sessionStorage.getItem('CurrentComments'));
        updateComment(JSON.stringify(commentObjectArr));
      }
    } else {
      try {
        const parsedParent = JSON.parse(parent);
        //console.log("Parent:", parsedParent);
        //console.log("Child:", child , " at: ", childId);
        // create new comment and
        //update child
        const commentObj = createComment(cmnt,username,[]);
        child.push(commentObj);
        //update the child in parent
        parsedParent[childId].comment.replies=child;
        //console.log("Updated Parent:", parsedParent);
        sessionStorage.setItem('CurrentComments', JSON.stringify(parsedParent));
        //console.log("New Comment:", commentObjectArr);
        //console.log("Checking session storage:", sessionStorage.getItem('CurrentComments'));
        updateComment(JSON.stringify(parsedParent));
        // Add comment to child JSON and update parent JSON
      } catch (error) {
        console.error("Error parsing parent:", error);
      }
    }    

  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment(''); // Clear the text box after submission
      if(!isMain){
        setReplying(!replying);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
      }}
    >
      <TextField
        label="Add a comment"
        variant="standard"
        multiline
        rows={3}
        value={comment}
        onChange={handleInputChange}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!comment.trim()} // Disable the button if the input is empty
        sx={{
          alignSelf: 'flex-end', // Aligns the button to the right
        }}
      >
        Post Comment
      </Button>
    </Box>
  );
};

export default CommentAdd;