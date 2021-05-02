import React from 'react';
import { Route } from 'react-router';
import { Layout } from './Layout';
import Home from './pages/Home';

import '../static/styles/custom.css'
import {AlertContextProvider} from '../contexts/AlertContext';
import AlertSelector from './AlertSelector';
import {AuthContextProvider} from '../contexts/AuthContext';


const App = () => {
    return (
        <AuthContextProvider >
            <AlertContextProvider>
                <Layout>
                    <AlertSelector />
                    <Route exact path='/' component={Home} />
                </Layout>
            </AlertContextProvider>
        </AuthContextProvider>
    );
};

export default App;
