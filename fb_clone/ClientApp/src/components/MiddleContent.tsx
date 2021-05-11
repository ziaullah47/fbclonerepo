import React from "react";
import Feeds from "./Feeds";
import TopSlide from "./TopSlide";

interface IProp extends React.HTMLAttributes<HTMLElement> {}

const MiddleContent: React.FunctionComponent<IProp> = props => {

    return (
        <div className="middle-content">
            <TopSlide />
            <Feeds className="feed-section" />
        </div>
    );
}
export default MiddleContent;