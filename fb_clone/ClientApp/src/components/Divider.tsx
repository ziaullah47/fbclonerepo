import React from "react";

interface IProp extends React.HTMLAttributes<HTMLElement> {

}

const Divider: React.FunctionComponent<IProp> = props => {
    const klass = props.className ? `divider ${props.className}` : "divider"
    return <div className={klass}></div>
}

export default Divider;