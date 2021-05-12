import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProp extends React.HtmlHTMLAttributes<HTMLElement> {
    url?: string;
    width?: string;
    height?: string;
}

const Avatar: React.FunctionComponent<IProp> = props => {
    const { className, url, width, height } = props;

    const getAvatar = () => {
        if (url) {
            return <img src={`data:image/png;base64, ${url}`} width={width ? width : 40} height={height ? height : 40} alt="Avatr" />;
        }
        return <div className="default-avatar"><FontAwesomeIcon icon={['far', 'user']} size="2x" /></div>
    }

    return (<div className={`avatar ${className ? className : ""}`}>
        {getAvatar()}
    </div>);
}
export default Avatar;