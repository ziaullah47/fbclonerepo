import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface IProp extends React.HtmlHTMLAttributes<HTMLElement> {
    src?: string;
    href?: string;
    width?: string;
    height?: string;
}

const Avatar: React.FunctionComponent<IProp> = props => {
    const { className, src, width, height, href } = props;

    const getAvatar = () => {
        if (href) {
            if (src) {
                return <Link to={href}>
                    <img src={`data:image/png;base64, ${src}`} width={width ? width : 40} height={height ? height : 40} alt="Avatr" />
                </Link>;
            }
            return <Link to={href}>
                <div className="default-avatar"><FontAwesomeIcon icon={['far', 'user']} size="2x" /></div>
            </Link>
        } else {
            if (src) {
                return <img src={`data:image/png;base64, ${src}`} width={width ? width : 40} height={height ? height : 40} alt="Avatr" />
            }
            return <div className="default-avatar"><FontAwesomeIcon icon={['far', 'user']} size="2x" /></div>
        }
    }

    return (<div className={`avatar ${className ? className : ""}`}>
        {getAvatar()}
    </div>);
}
export default Avatar;