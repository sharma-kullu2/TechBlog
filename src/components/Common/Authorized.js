import * as React from 'react';
import Redirect from './Redirect';
import { Loading } from '../Graphics/Loading';

function Authorized({jsx}){
    const [isAuth ,setIsAuth] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect( () => {
        const auth = sessionStorage.getItem('editorAuth');
        console.log("Authorization status ",auth);
        if(auth === 'true'){
            setIsAuth(true);
        }
        setLoading(false);
    },[]);

    /**
     * NOTE: https://stackoverflow.com/questions/39652686/pass-react-component-as-props
    **/
    if(loading){
        return <Loading />;
    }
    if(isAuth){
        return <>{jsx}</>;
    }
    else{
        return (
            <Redirect message={"You are not authorized to connect to this page !!"}/>
        );
    }
}

export default Authorized;