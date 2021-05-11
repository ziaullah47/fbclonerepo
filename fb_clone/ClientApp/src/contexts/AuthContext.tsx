import React, { createContext, useState } from "react";
import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_PATH, LOGGED_IN_USER_COOKIE_NAME } from "../common/Constants";
import { IUser } from "../common/types";
import CookieService from "../services/CookieService";

interface IProp { }

interface IAuthContext {
    isAuthenticate: boolean;
    currentUser: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

let contextDefaultValue: IAuthContext = {
    isAuthenticate: false,
    currentUser: null,
    login: () => { },
    logout: () => { }
}

export const AuthContext = createContext<IAuthContext>(contextDefaultValue);
const Provider = AuthContext.Provider;

export const AuthContextProvider: React.FunctionComponent<IProp> = (props) => {

    const cookieService = new CookieService();
    let isCookieExist = cookieService.get(ACCESS_TOKEN_COOKIE_NAME) !== undefined;
    let c_user = cookieService.get(LOGGED_IN_USER_COOKIE_NAME);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isCookieExist);
    const [currentUser, setCurrentUser] = useState<IUser | null>(c_user !== undefined ? c_user : null);

    const handleLogin = (user: IUser) => {
        cookieService.set(LOGGED_IN_USER_COOKIE_NAME, user);
        setIsAuthenticated(true);
        setCurrentUser(user);
    }

    const handleLogout = () => {
        cookieService.remove(ACCESS_TOKEN_COOKIE_NAME, {path: COOKIE_PATH});
        cookieService.remove(LOGGED_IN_USER_COOKIE_NAME, { path: COOKIE_PATH })
        setIsAuthenticated(false);
        setCurrentUser(null);
    }

    let contextInitState: IAuthContext = {
        isAuthenticate: isAuthenticated,
        currentUser: currentUser,
        login: handleLogin,
        logout: handleLogout
    }

    return <Provider value={contextInitState}>{props.children}</Provider>

}