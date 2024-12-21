import * as React from 'react';
import {Stack,Typography,Button,Divider,Link,Box,Card,IconButton,CardContent,CardActions} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CommentAdd from './CommentAdd';
import {PreLikeStruct} from './AddCommentUtility';

const ReplyButton = ({replying, setReplying}) => {
    const handleClick = () => {
    setReplying(!replying);
  };

  return (
    <Typography
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: replying ? 'primary.main' : 'text.secondary',
        fontWeight: replying ? 'bold' : 'normal',
        '&:hover': {
          color: 'primary.dark',
        },
      }}
    >
      <ReplyIcon
        sx={{
          fontSize: '18px',
          marginRight: '4px',
          color: replying ? 'primary.main' : 'inherit',
        }}
      />
      {replying ? 'Replying' : 'Reply'}
    </Typography>
  );
};

const LikeButton = ({UId,liked,setLiked}) => {
    const [id] = React.useState(UId);

    React.useEffect( () =>{
      const checkLike = () =>{
        const comments =  sessionStorage.getItem('CurrentComments');
        let uid = sessionStorage.getItem('CurrentID');
        console.log("uid--> ",uid," comments--> ",comments);
        if(!uid){ // add logic for generating random UID
          uid="1234" 
        }
        if(comments)
          {
            const commentsJSON =  JSON.parse(comments);
            if(id.L2) // inner LIKE
            {
              const nameArr = commentsJSON[id.L1].comment.replies[id.L2].comment.likes ;
              console.log("DEBUG: Name List : ",nameArr);
              if (nameArr.length > 0){
                return new PreLikeStruct({
                  Included : nameArr.includes(uid),
                  Likes : nameArr.length,
                }
              );}
              else{
                return new PreLikeStruct();
              }
            }
            else{
              const nameArr = commentsJSON[id.L1].comment.likes;
              console.log("DEBUG: Name List : ",nameArr);
              if (nameArr.length > 0){
                return new PreLikeStruct({
                  Included : nameArr.includes(uid),
                  Likes : nameArr.length,
                }
              );}
              else{
                return new PreLikeStruct();
              }
            }
          }
        return null;  
      }
      // check Likes and Name 
      const CheckNull = checkLike();
      console.log("null check:->  ",CheckNull);
      if (CheckNull){ //NOT NULL
        if (CheckNull.nameIncluded){ //is True
          console.log("set to liked");
          setLiked(!liked);
        }
        if (CheckNull.totalLikes > 0){
           // @Todo implement likes number with like button
           console.log("Likes: ",CheckNull.totalLikes);
        }
      }
    },[]);

    const handleClick = () => {
      setLiked(!liked);
      console.log("Unique ID =>",id);
      const commentJson = JSON.parse(sessionStorage.getItem('CurrentComments'));
      let uid = sessionStorage.getItem('commentID');
        if(!uid){ // add logic for generating random UID
          uid="1234" 
        }
      if(!liked){
        if(id.L2){
          commentJson[id.L1].comment.replies[id.L2].comment.likes.push(uid);
        }
        else
        {
          commentJson[id.L1].comment.likes.push(uid);
        }
      }
      else{
        if(id.L2){
          const idx = commentJson[id.L1].comment.replies[id.L2].comment.likes.lastIndexOf(uid);
          console.log("DEBUG : at index ->",idx);
          commentJson[id.L1].comment.replies[id.L2].comment.likes.splice(idx,1);
        }
        else
        {
          const idx = commentJson[id.L1].comment.likes.lastIndexOf(uid);
          console.log("DEBUG : at index ->",idx);
          commentJson[id.L1].comment.likes.splice(idx, 1);
        }
      }
      console.log("After update", commentJson);
      sessionStorage.setItem('CurrentComments', JSON.stringify(commentJson));
    };
  
    return (
      <Typography
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: liked ? 'primary.main' : 'text.secondary',
          fontWeight: liked ? 'bold' : 'normal',
          '&:hover': {
            color: 'primary.dark',
          },
        }}
      >
        <ThumbUpIcon
          sx={{
            fontSize: '18px',
            marginRight: '4px',
            color: liked ? 'primary.main' : 'inherit',
          }}
        />
        {liked ? 'Liked' : 'Like'}
      </Typography>
    );
};

const Replies = ({openStates, setOpenStates, number, index}) => {
  const handleClick = () => {
        setOpenStates((prev) => ({
          ...prev,
          [index]: !prev[index], // Toggle the open state for the current index
        }));
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={handleClick}
      sx={{
        cursor: "pointer", // Add pointer cursor for a button-like experience
        "&:hover": { opacity: 0.8 }, // Add hover effect
      }}
    >
      {/* Icon for replies */}
      <IconButton size="small" color={openStates[index] ? "primary" : "default"}>
        <ChatBubbleOutlineIcon />
      </IconButton>
      {/* Number of replies */}
      <Typography variant="body2" color={openStates[index] ? "primary" : "textSecondary"}>
        {number} {number === 1 ? "Reply" : "Replies"}
      </Typography>
    </Stack>
  );
};

function CommentElement({openStates, setOpenStates, comment,inner ,index, updateComment ,UId}){
    //console.log("Element :",comment);
    //console.log("Inner", inner);
    //console.log("index",index);
    //console.log("Length: ",comment.comment.replies.length);
    //console.log("Replies available: ",comment.comment.replies);
 
    const [replying, setReplying] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    return(
          <Card variant="outlined" >
            <CardContent>
              <Stack direction="column" spacing={2}>
                      <Typography variant="h6" gutterBottom>
                          {comment.name}:            
                      </Typography>
                      <Typography>{comment.comment.string}</Typography>
                      <CardActions>
                        <Stack direction="row" spacing={2}>
                            <LikeButton {...{UId,liked,setLiked}}/>
                            {!inner &&
                            (<><ReplyButton replying={replying} setReplying={setReplying}/>
                            {( comment.comment.replies.length > 0) && (
                              <Replies number={comment.comment.replies.length} {...{ openStates, setOpenStates } } index={index} />
                            )}</>)
                          }
                        </Stack>
                      </CardActions>
                      {replying&&(<CommentAdd isMain={false} child={comment.comment.replies} childId= {index} updateComment={updateComment} {...{replying, setReplying}}/> )}
              </Stack>
            </CardContent>
          </Card>
    );
}

export default CommentElement;