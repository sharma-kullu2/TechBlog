import * as React from 'react';
import EditorContent from './Content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline, Container, Stack, Typography,Paper } from '@mui/material';
import Commonheader from '../Common/CustomHeader';
import getAppTheme from '../Common/getAppTheme';
import { useNavigate } from 'react-router-dom';


function Preview(){
    const theme = createTheme(getAppTheme('light'));

    const [content, setContent] = React.useState('');
    const [title, setTitle] =  React.useState('');
    const [imgURL, setImgURL] =  React.useState('');
    const [postType, setPostType] =  React.useState('');
    const [mail, setMail] =  React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [saved, setSaved] = React.useState(false);
    const [customTwoTitle, setCustomTwoTitle] =  React.useState('Save');


    const RendererCalled = React.useRef(false); // to prevent double rendering from react strict mode 
    
    const navigate = useNavigate();
    const editorFun = () =>{
        navigate('/editor');
    }

    const validateInputs = () => {
        console.log('inputs-->',imgURL,postType,mail,description);
        if(mail === ""){
            return false;
        }
        if(saved){
            //console.log('Already saved');
            alert('Post is Saved !!');
            return false;
        }
        
        return true
    }

    const saveFun = async () => {
        //setIsLoading(true);
        if (validateInputs())
        {
          try {
              const response = await fetch('/api/addpost', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: mail, title : title , content: content, type: postType, imgUrl:imgURL, summary: description, tags:tags, section: category }),
              });
    
              //const data = await response.json();
    
              console.log('Response: ',response);
    
              if (response.ok) {
                    // Handle successful sign-in (e.g., redirect to dashboard)
    
                    console.log('POST ADDED', response);
                    setSaved(true);
                    setCustomTwoTitle('Saved');
                    sessionStorage.removeItem('renderContent'); // session storage of saved content cleared 
                    // 
              } else {
                    // Handle sign-in error
                    //setError(data.message || 'Sign-in failed. Please try again.');
                    console.log('POST NOT ADDED');
              }
          } catch (error) {
                //setError('An error occurred. Please try again.');
                console.log('An error occurred. Please try again.');
          } 
        }
      };

    React.useEffect( () =>{
        if(!RendererCalled.current){
            //read session storage
            const title=sessionStorage.getItem('editorTitle');
            setTitle(title);
            const content=sessionStorage.getItem('editorContent');
            setContent(JSON.parse(content));
            const url=sessionStorage.getItem('editorImgURL');
            setImgURL(url);
            const type=sessionStorage.getItem('editorType');
            setPostType(type);
            const email= sessionStorage.getItem('editorMail');
            setMail(email);
            const description = sessionStorage.getItem('editorDescription');
            setDescription(description);
            const category =  sessionStorage.getItem('editorCategory');
            setCategory(category);
            const tagsList= sessionStorage.getItem('editorTags');
            //convert to array
            const tags = tagsList.split(',').map(item => item.trim());
            //console.log("PREVIEW--tags=>",tags);
            setTags(tags);
            //console.log("Content :", content);
            RendererCalled.current = true;
            console.log("Current :", RendererCalled.current);
        }
    }, [] );

    if(content === ''){
        return (<div>Loading....</div>);
    }
    else{
        return(
            <ThemeProvider theme={theme}>
              <CssBaseline />
                <Container maxWidth="lg">
                    <Commonheader title={'Preview'}
                        setcustomOne={true}
                        customOne= {{
                            title: 'Editor',
                            func: editorFun // Pass the function directly without wrapping it in {}
                            }}
                        setcustomTwo={true}
                        customTwo= {{
                            title: customTwoTitle,
                            func: saveFun // Pass the function directly without wrapping it in {}
                            }} 
                            />
                    <Paper elevation={1} 
                            sx={{ 
                                //width:'60vw',
                                //height:'80vh',
                                p: 2, 
                                //bgcolor: 'grey.200',
                                overflow: 'auto'
                        }}
                    >
                        <Stack
                            spacing={2}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography
                                variant='h3'
                                gutterBottom
                            >
                                {title}
                            </Typography>
                            <EditorContent data={content}/>
                        </Stack>
                    </Paper>
                </Container>
            </ThemeProvider>
        );
    }
}

export default Preview;