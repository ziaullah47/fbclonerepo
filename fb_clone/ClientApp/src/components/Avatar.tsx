import React from "react";

interface IProp extends React.HtmlHTMLAttributes<HTMLElement>{
    url: string;
    width: string;
    height: string;
}

const Avatar: React.FunctionComponent<IProp> = props => {
    const {className, url, width, height} = props;
    return(<div className={`avatar ${className ? className : ""}`}>
        <img src={url} width={width} height={height} alt="Avatr" />
    </div>);
}
export default Avatar;