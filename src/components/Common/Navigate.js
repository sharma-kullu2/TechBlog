import React from 'react';
import Renderpost from '../Blog/Renderpost';
import Preview from '../Render/Preview';
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../Graphics/Loading';
import Authorized from './Authorized';



function Navigation(){
        const [searchParams] = useSearchParams();

        // State to hold the values of type and title
        const [type, setType] = React.useState('');
        const [title, setTitle] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [response, setResponse] = React.useState(null);
        const [preview,setPreview] =React.useState(false);
        const [error, setError] = React.useState(false);
    
        // Extract type or title from URL params
        React.useEffect(() => {
            const urlType = searchParams.get('type');
            const urlTitle = searchParams.get('title');
            
            if (searchParams.has('Preview')){
                setPreview(true)
            }
            // Set title or type conditionally based on URL params
            if (urlType) {
                setType(urlType);
                setTitle(''); // Set title to empty if type exists
            } else if (urlTitle) {
                setTitle(urlTitle);
                setType(''); // Set type to empty if title exists
            }
        }, [searchParams]);
    
        
    
        // Trigger API call when type or title changes
        React.useEffect(() => {
            //
            // Async function to make the API call
            const fetchPostData = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/api/getpost', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ postType: type, postTitle: title }),
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setResponse(data.data);
                        console.log('API Response:', data.data);
                    } else {
                        console.error('Error in response');
                        setError(true);
                    }
                } catch (error) {
                    console.error('Error occurred while fetching data:', error);
                }
                setLoading(false);
            };    
            //
            setError(false);
            if (type || title) fetchPostData();
        }, [type, title]);

        if(preview){
            return (<Authorized jsx={<Preview/>}/>); 
        }
        if(title){
            return (<Renderpost title={title} post={response} singlePost ={true} loading ={loading} error ={error}/>);
        }
        if(type){
            return (<Renderpost title={type} post={response} singlePost ={false} loading ={loading} error ={error}/>);
        }
        if(loading){
            return (<Loading/>);
        }  
}

export default Navigation;