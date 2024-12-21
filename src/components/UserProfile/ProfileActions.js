import * as React from 'react';
import {Stack, Card, Typography,Divider, Box, FormControl,FormLabel,TextField, Button} from '@mui/material/';


function ProfileActions({profile , edit ,editDoneFnCb}){
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');
    
        let isValid = true;
    
        if (!password.value || password.value.length < 6) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }
    
        if (!name.value || name.value.length < 1) {
          setNameError(true);
          setNameErrorMessage('Name is required.');
          isValid = false;
        } else {
          setNameError(false);
          setNameErrorMessage('');
        }
    
        return isValid;
    };
    
    const saveProfile = () =>{
        if(validateInputs()){
            alert("Profile updated");
        }
    }

return(
    <Card
        sx={{ 
            boxShadow: 0,
            display:'flex',
            justifyContent:'center',
            alignItems: 'center', 
            p:5}}
    >{edit ?
        (<Stack
            spacing={2}
        >
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Typography
                    sx={{ boxShadow: 2, borderRadius: 0, display: 'inline', justifyContent: 'center',alignItems: 'center' }}  
                    variant="body1"
                >
                <strong>Name:</strong> 
                </Typography>
                <Typography
                    sx={{ boxShadow: 2, borderRadius: 0, display: 'inline', justifyContent: 'center',alignItems: 'center' }}  
                    variant="body1"
                >
                    {profile.username}
                </Typography>
                </Stack>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                >
                    <Typography
                    sx={{ boxShadow: 2, borderRadius: 0, display: 'stretch', justifyContent: 'center',alignItems: 'center' }}  
                    variant="body1"
                    >
                        <strong>Email:</strong> 
                    </Typography>
                    <Typography
                        sx={{ boxShadow: 2, borderRadius: 0, display: 'stretch', justifyContent: 'center',alignItems: 'center' }}  
                        variant="body1"
                    >
                        {profile.email}
                    </Typography>
                </Stack>
        </Stack>)
        :
        (<Stack>
            <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
            Edit Profile
            </Typography>
            <Box
            component="form"
            onSubmit={(event) => {
                            event.preventDefault();
                            const data = new FormData(event.currentTarget);
                            console.log({
                            name: data.get('name'),
                            email: data.get('email'),
                            password: data.get('password'),
                            });
                        }
                    }
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
            <FormControl>
            <FormLabel htmlFor="name">Update Name</FormLabel>
            <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
            />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="password">Update Password</FormLabel>
            <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
            />
            </FormControl>
            <Stack direction = "row" spacing = "5px" >
            <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={saveProfile}
            >
            Save
            </Button>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={()=>{
                console.log("back press")
                editDoneFnCb();
            }}
            >
            Back
            </Button>
            </Stack>
            </Box>
        </Stack>)
    }
    </Card>
 );
}

export default ProfileActions;