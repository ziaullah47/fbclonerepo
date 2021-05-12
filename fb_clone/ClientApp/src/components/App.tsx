import React, { useContext, useEffect } from 'react';
import { Layout } from './Layout';
import Home from './pages/Home';

import '../static/styles/custom.css'
import { AlertContextProvider } from '../contexts/AlertContext';
import AlertSelector from './AlertSelector';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext';
import Profile from './pages/Profile';
import SearchResult from './SearchResult';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import TopNav from './TopNav';
import { BrowserRouter, Switch, useLocation } from 'react-router-dom';
import UserService from '../services/UserService';


const App = () => {
    const authContext = useContext(AuthContext);
    const userService = new UserService();

    useEffect(() => {
        if (authContext.isAuthenticate) {
            userService.GetCurrentUser().then(resp => {
                authContext.login(resp.data);
            })
        }
    }, [])

    return (

        <BrowserRouter>
            <Layout>
                {authContext.isAuthenticate ? <TopNav /> : null}
                <div className="content-wrapper">
                    <AlertSelector />
                    <Switch>
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PublicRoute exact path="/search" component={SearchResult} />
                        <PublicRoute exact path='/' component={Home} />
                    </Switch>
                </div>
            </Layout>
        </BrowserRouter>

    );
};

export default App;
