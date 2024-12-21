import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Typography, Toolbar} from '@mui/material'


function Commonheader(props){
    const title = props.title;
    const customTwo = props.setcustomTwo;
    const customOne = props.setcustomOne;
    const logout = props.logout;
    //console.log('1 ',customOne,' 2 ',customTwo,' 3 ',logout);

    const navigate = useNavigate();

    const homeButton = () => {
        navigate('/')
    };

    const userlogout = () =>{
        localStorage.clear();
        homeButton();  // Redirect to home page
    };

    return (
        <Toolbar 
            sx={{ borderBottom: 1, 
                borderColor: 'divider', 
                display: 'flex'
            }}
        >
            {!customOne ?
            <Button size="small"
                onClick={homeButton}
            >
                Home
            </Button> 
            :
            <Button size="small"
                onClick={props.customOne.func}
            >
                {props.customOne.title}
            </Button> 
            }
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                sx={{ flex: 1 }}
            >
                {title}
            </Typography>
            {logout ? (
                <Button size="small" onClick={userlogout}>
                    Logout
                </Button>
            ) : (
                customTwo && (
                    <Button size="small" onClick={props.customTwo.func}>
                        {props.customTwo.title}
                    </Button>
                )
            )}
        </Toolbar>
      );
};

export default Commonheader;