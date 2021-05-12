import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../common/types";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import LeftMenu from "../LeftMenu";
import MiddleContent from "../MiddleContent";
import RightMenu from "../RightMenu";
import TopNav from "../TopNav";

const Wall: React.FunctionComponent = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isAuthenticate) {
        return null;
    }

    return (
        <React.Fragment>
            <LeftMenu />
            <MiddleContent />
            <RightMenu />
        </React.Fragment>
    );
}
export default Wall;