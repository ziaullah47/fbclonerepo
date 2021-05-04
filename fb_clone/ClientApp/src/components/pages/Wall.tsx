import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import LeftMenu from "../LeftMenu";
import MiddleContent from "../MiddleContent";
import RightMenu from "../RightMenu";
import TopNav from "../TopNav";

const Wall: React.FunctionComponent = () => {
    const authService = new AuthService();
    const authContext = useContext(AuthContext);
    
    if(!authContext.isAuthenticate) {
        return null;
    }

    if(authContext.currentUser == null) {
        authService.getCurrentUser().then(resp => {
            authContext.login(resp.data);
        })
    }

    return (
        <div>
            <TopNav />
            <div className="content-wrapper">
                <LeftMenu />
                <MiddleContent />
                <RightMenu />
            </div>
        </div>
    );
}
export default Wall;