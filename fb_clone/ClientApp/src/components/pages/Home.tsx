
import React, {useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LoginAndRegistration from './LoginAndRegistration';
import "./Home.css";
import Wall from './Wall';


const Home: React.FunctionComponent = () => {

    const authContext = useContext(AuthContext);
    return(<React.Fragment>
        {authContext.isAuthenticate ? <Wall /> : <LoginAndRegistration />}
    </React.Fragment>)
}
export default Home;
