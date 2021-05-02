import React, { createContext, useState } from "react";
import { ACCESS_TOKEN_COOKIE_NAME } from "../common/Constants";
import CookieService from "../services/CookieService";

interface IProp { }

interface IAuthContext {
    isAuthenticate: boolean;
    login: () => void;
    logout: () => void;
}

let contextDefaultValue: IAuthContext = {
    isAuthenticate: false,
    login: () => { },
    logout: () => { }
}

export const AuthContext = createContext<IAuthContext>(contextDefaultValue);
const Provider = AuthContext.Provider;

export const AuthContextProvider: React.FunctionComponent<IProp> = (props) => {

    const cookieService = new CookieService();
    let isCookieExist = cookieService.get(ACCESS_TOKEN_COOKIE_NAME) !== undefined;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isCookieExist);

    const handleLogin = () => {
        setIsAuthenticated(true);
    }

    const handleLogout = () => {
        setIsAuthenticated(false);
    }

    let contextInitState: IAuthContext = {
        isAuthenticate: isAuthenticated,
        login: handleLogin,
        logout: handleLogout
    }

    return <Provider value={contextInitState}>{props.children}</Provider>

}