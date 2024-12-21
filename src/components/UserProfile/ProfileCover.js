import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { Card,FormLabel } from '@mui/material';
import Animprofile from '../Graphics/Animprofile';
import ProfileActions from './ProfileActions';

function ProfileCover(props) {
    const { profile } = props;

    const navigate = useNavigate();

    const [editButton,seteditButton] = React.useState(true);
    
    const editProfile = () => {
        seteditButton(false);
    };

    const editProfileDone =() =>{
        seteditButton(true);
    }

    const createContent = () =>{
        navigate('/editor')
    };

    return (       
            <Grid 
                container columnSpacing={{ xs: 2, sm: 2, md: 3 }}
            >
                    <Box
                        sx={{
                            width: '100vw',
                            height: '20vh',
                            backgroundColor: '#EFEAEA',
                            p: 1,
                            border: 1,
                            overflow: 'hidden',       // Prevents overflow
                            display: 'flex',          // Flexbox layout
                            alignItems: 'center',     // Centers vertically
                            justifyContent: 'center', // Centers horizontally
                        }}
                        >
                        <Animprofile/>
                    </Box>  
                    <Box
                        sx={{
                            width: '20vw',       // Full width of the viewport
                            //height: '60vh',        // 1/5th of the viewport height
                            //backgroundColor: 'white', // Example background color
                            marginRight: 'auto',
                            display: 'inline',
                            justifyContent:'center',
                            alignItems: 'center',
                            whiteSpace: 'normal',
                            p:1,
                            }}
                            //flexWrap="wrap"
                        >
                            <Stack 
                            spacing={1}
                            useFlexGap
                            sx={{
                                display: 'flex',
                                justifyContent:'center',
                                alignItems: 'center',
                                }}
                            >    
                                <Box
                                    sx={{
                                        width: 100,               // Diameter of the circle
                                        height: 100,              // Diameter of the circle
                                        borderRadius: 50,     // Makes the Box a circle
                                        display: 'flex',         // Ensures the icon is centered
                                        alignItems: 'center',    // Vertically centers the icon
                                        justifyContent: 'center',// Horizontally centers the icon
                                        backgroundColor: 'lightblue', // Background color of the circle
                                        //boxShadow: 1,            // Optional: Adds a slight shadow for a 3D effect
                                    }}
                                >
                                    <h1>img</h1>          
                                </Box>
                                    <Typography variant="h5" color="inherit" paragraph>
                                        {profile.username}
                                    </Typography>
                                    <Typography 
                                        sx={{ boxShadow: 2, borderRadius: 2, display: 'stretch', justifyContent: 'center',alignItems: 'center' }} 
                                        variant="h8" 
                                        color="inherit" 
                                        paragraph
                                        component="button" // Renders Typography as a button
                                        onClick={editProfile} // Adds the click action
                                    >
                                        Edit Profile
                                    </Typography>
                                    <Typography 
                                        sx={{ boxShadow: 2, borderRadius: 2, display: 'stretch', justifyContent: 'center',alignItems: 'center' }} 
                                        variant="h8" 
                                        color="inherit" 
                                        paragraph
                                        component="button" // Renders Typography as a button
                                        onClick={createContent} // Adds the click action
                                    >
                                        Content Editor
                                    </Typography>                         
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                    width: '68vw',       // Full width of the viewport
                                    //height: '60vh',        // 1/5th of the viewport height
                                    backgroundColor: 'white', // Example background color
                                    overflowY: 'auto',
                                    marginLeft: 'auto',
                                    display:'centre',
                                    boxShadow: 2, 
                                    borderRadius: 0,
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    p:5
                                }}
                                //flexWrap="wrap"
                        >
                            <ProfileActions profile={profile} edit={editButton} editDoneFnCb = {editProfileDone} />
                        </Box>
                </Grid>      
    );
}

export default ProfileCover;