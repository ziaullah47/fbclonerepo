import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LeftMenu from "../LeftMenu";
import MiddleContent from "../MiddleContent";
import RightMenu from "../RightMenu";

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