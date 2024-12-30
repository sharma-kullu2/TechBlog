import * as React from 'react';
import Commonheader from '../Common/CustomHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline,Container,Grid,TextField,Paper,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import Footer from '../Blog/Footer';
import Reacteditor from './Reacteditor';
import { useNavigate } from 'react-router-dom';
import getAppTheme from '../Common/getAppTheme';
import {sections} from '../Interface/defaults';
import JsonUploader from './Jsonuploader';

function Editor(){
    const [postTitle, setPostTitle] = React.useState('');
    const [selectedPost, setSelectedPost] = React.useState('post3');
    const [category , setCategory] = React.useState(sections[0].title);
    /* As part of new change setting URL as a requirement for all posts type
    *  for quick implementation setting default state as true
    *  if modifications are needed then change default to false
    *  and update handleChange function 
    */
    const [mainFeaturedPost, setMainFeaturedPost] = React.useState(true);
    const [imgUrl, setImgUrl] = React.useState('');
    const [postdescription, setPostDescription] = React.useState('');
    const [tags,setTags] = React.useState('');
    const editorinstance = React.useRef(null);
    const theme = createTheme(getAppTheme('light'));

    /* 
    * FEATURE JSON UPLOAD
    */
    const [fileContent, setFileContent] = React.useState(null);

    const navigate = useNavigate();

    const handleChange = (event) => {
      setSelectedPost(event.target.value);
      setMainFeaturedPost(true); //effectively has no effect|see definition
      /*setMainFeaturedPost(false);
      if ((event.target.value === 'post1') || (event.target.value === 'post2')){
        setMainFeaturedPost(true);
      }*/
    };

    const previewFun = async () => {
        try {       
            // Here, you can send savedData to your server or save it to local storage
            // For example, to save to local storage:
            console.log('Title: ',postTitle);
            if(postTitle === ''){
                alert('Enter a title!! (Required)');
                return;
            }
            const savedData = await editorinstance.current.save();
            //console.log('Saved content:', savedData, 'JSON: ',savedData["blocks"]);
            if(savedData.blocks.length === 0){
                alert('Enter Content!! (Required)');
                return;
            }
            sessionStorage.setItem('editorTitle',postTitle);
            sessionStorage.setItem('editorContent', JSON.stringify(savedData));
            sessionStorage.setItem('editorImgURL', imgUrl);
            sessionStorage.setItem('editorType', selectedPost);
            sessionStorage.setItem('editorDescription',postdescription);
            sessionStorage.setItem('editorCategory',category);
            sessionStorage.setItem('editorTags',tags);
            navigate(`/page?Preview`);
        } catch (error) {
            console.error('Saving failed:', error);
        }
    };

    React.useEffect( () =>{
        const title = sessionStorage.getItem('editorTitle');
        if (title !== null)
        {
            console.log('Title: ',title);
            setPostTitle(title);
        }
    },[]);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Commonheader title={'Editor'} 
                setcustomTwo={true}
                customTwo= {{
                    title: 'Preview',
                    func: previewFun // Pass the function directly without wrapping it in {}
                            }} />
                    <main>
                        <Grid
                            container
                            //spacing={2}
                            direction="column"
                            sx ={{
                                m:1,
                                gap: 2,
                                //display:'inline',
                                justifyContent:'center',
                                alignItems: 'center',  
                            }}

                        >
                        <FormControl variant="standard"   
                            sx={{ 
                                width:'60vw',
                            }}
                        >
                            <InputLabel id="post-dropdown-label">Select Category</InputLabel>
                            <Select
                                labelId="post-dropdown-label"
                                id="post-dropdown"
                                value={category}
                                onChange={(event) =>{
                                    setCategory(event.target.value);
                                }}
                                label="Select Category"
                            >
                            {
                                sections.map( (item) =>(
                                        <MenuItem value={item.title}>{item.title}</MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        <FormControl variant="standard"   
                            sx={{ 
                                width:'60vw',
                            }}
                        >
                            <InputLabel id="post-dropdown-label">Select Post</InputLabel>
                            <Select
                                labelId="post-dropdown-label"
                                id="post-dropdown"
                                value={selectedPost}
                                onChange={handleChange}
                                label="Select Post"
                            >
                                <MenuItem value="post1">Main Featured Post</MenuItem>
                                <MenuItem value="post2">Featured Post</MenuItem>
                                <MenuItem value="post3">Standard Post</MenuItem>
                            </Select>
                        </FormControl>
                        {mainFeaturedPost &&
                            <TextField
                                label="Enter Image URL that describes the post best"
                                variant="standard"
                                value={imgUrl}
                                onChange={(event)=>{
                                    setImgUrl(event.target.value);
                                }}
                                fullWidth
                                sx={{ 
                                    width:'60vw',
                                }}
                            />
                        }
                        <TextField
                            label="Enter Title"
                            variant="standard"
                            value={postTitle}
                            onChange={(event) =>{
                                setPostTitle(event.target.value);
                            }}
                            fullWidth
                            sx={{ 
                                width:'60vw',
                            }}
                        />
                        <TextField
                            label="Enter Short Description"
                            variant="standard"
                            value={postdescription}
                            onChange={(event)=>{
                                setPostDescription(event.target.value)
                            }}
                            fullWidth
                            sx={{ 
                                width:'60vw',
                            }}
                        />
                        <TextField
                            label="Enter Tags"
                            variant="standard"
                            value={tags}
                            onChange={(event)=>{
                                setTags(event.target.value)
                            }}
                            fullWidth
                            sx={{ 
                                width:'60vw',
                            }}
                        />
                        <Paper elevation={1} 
                            sx={{ 
                                width:'60vw',
                                height:'80vh',
                                p: 2, 
                                bgcolor: 'grey.200',
                                overflow: 'auto'
                            }}
                        >
                            <Reacteditor instance={editorinstance} newcontent={fileContent}/>
                        </Paper>
                        <JsonUploader {...{fileContent, setFileContent}}/>
                        </Grid>
                    </main>
        </Container>
        <Footer
            title="Footer"
            description="Something here to give the footer a purpose!"
        />
        </ThemeProvider>
      );
};

export default Editor;