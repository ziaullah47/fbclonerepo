import React from "react";
import Feeds from "./Feeds";
import NewPost from "./NewPost";
import TopSlide from "./TopSlide";

interface IProp extends React.HTMLAttributes<HTMLElement> {

}

const MiddleContent: React.FunctionComponent<IProp> = props => {
    return(
        <div className="middle-content">
            <TopSlide />
            <NewPost />
            <Feeds />
        </div>
    );
}
export default MiddleContent;