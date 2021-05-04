import React from "react";

interface IProp extends React.HTMLAttributes<HTMLElement> {

}
const RightMenu: React.FunctionComponent<IProp> = props => {
    return(
        <div className="right-menu">
            Right Menu
        </div>
    );
}
export default RightMenu