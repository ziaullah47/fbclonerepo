import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

interface IProp extends React.HTMLAttributes<HTMLElement> {}
const LeftMenu: React.FunctionComponent<IProp> = (props) => {
    return(
        <div className="left-menu">
            <Nav vertical>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon="heartbeat"/>
                        <h6 className="mx-2 my-0">COVID-19 Information Center</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon="user-friends"/>
                        <h6 className="mx-2 my-0">Friends</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon={['fab', 'facebook-messenger']}/>
                        <h6 className="mx-2 my-0">Messenger</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon="flag"/>
                        <h6 className="mx-2 my-0">Pages</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon="users"/>
                        <h6 className="mx-2 my-0">Groups</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon='bullhorn'/>
                        <h6 className="mx-2 my-0">Ad Center</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon={['far', 'chart-bar']}/>
                        <h6 className="mx-2 my-0">Ad Manager</h6>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/" className="hoverable-nav-link">
                        <FontAwesomeIcon icon='hands-helping'/>
                        <h6 className="mx-2 my-0">Community Help</h6>
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}
export default LeftMenu;