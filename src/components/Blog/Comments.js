import * as React from 'react';
import {Stack,Typography,Divider,Link,Box,List,ListItemIcon, Collapse,ListItem,ListItemText} from '@mui/material';
import CommentElement from '../Comments/CommentElement';
import CommentAdd from '../Comments/CommentAdd';
import StartIcon from '@mui/icons-material/Start';
import {IndexCollection} from '../Comments/AddCommentUtility';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Comments({comments, updateComment}){
    const [openStates, setOpenStates] = React.useState({});
    console.log("comments js", comments , typeof comments);
    return(
    <Box>
        <Stack direction="column" spacing={2}>
            <Typography component="h1" variant="h5" color="inherit" gutterBottom>
                Comments            
            </Typography>
            {
            comments &&
                comments.map((comment, outerindex) => (
                <List>
                    <CommentElement key={comment.name} comment={comment}  {...{ openStates, setOpenStates }} inner={false} index={outerindex} updateComment={updateComment} UId={ new IndexCollection({L1:outerindex})}/>
                    <Collapse in={openStates[outerindex]} timeout="auto" unmountOnExit>
                    {comment.comment.replies &&
                        comment.comment.replies.map((singleComment, index) => (
                                <List component="div" disablePadding>
                                    <ListItem alignItems="flex-start">
                                        <ListItemIcon>
                                            <StartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary ={
                                        <React.Fragment>
                                            <CommentElement key={singleComment.name} comment={singleComment} inner={true} index={index} updateComment={updateComment} UId={ new IndexCollection({L1:outerindex, L2:index})}/>
                                        </React.Fragment>
                                        }/>
                                    </ListItem>
                                </List>
                           
                        ))}
                    </Collapse>
                </List>
                ))
            }
            {
                !comments && <Typography>
                No comments found !!            
                </Typography>
            }
            <CommentAdd isMain={true} updateComment={updateComment}/>
        </Stack>
    </Box>
 );
};

export default Comments;