import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Collapse, Form, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";

const TopNav: React.FunctionComponent = () => {
    const authContext = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => setIsOpen(!isOpen);

    const seachOnSubmit = () => {
        alert("Not implemented");
    }

    return (
        <Navbar color="light" fixed="top" light expand="md" className="shadow mb-2 bg-white rounded">
            <div className="nav-items">
                <div className="nav-items-left">
                    <NavbarBrand href="/">
                        <FontAwesomeIcon icon={['fab', 'facebook']} color="#0E8EF2" size="2x" />
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} />
                    <Nav navbar>
                        <NavItem>
                            <Form onSubmit={seachOnSubmit}>
                                <div className="d-flex justify-content-center align-items-center nav-search">
                                    <FontAwesomeIcon icon="search" />
                                    <Input type="search" placeholder="Search Facebook"></Input>
                                </div>
                            </Form>
                        </NavItem>
                    </Nav>
                </div>
                <Collapse isOpen={isOpen} navbar  className="nav-items-middle">
                    <Nav navbar>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="home" size="2x" color="#0E8EF2" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="tv" size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="store" size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="users" size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="gamepad" size="2x" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <Collapse isOpen={isOpen} navbar className="nav-items-right">
                    <Nav navbar >
                        <NavItem className="px-4">
                            <NavLink href="/" className="d-flex align-items-center justify-content-center">
                               <Avatar url="https://avatars.githubusercontent.com/u/4953463?v=4" width="40px" height="40px"/>
                               <span className="ml-1">{authContext.currentUser?.firstName}</span>
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="th" size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon={['fab', 'facebook-messenger']} size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="bell" size="2x" />
                            </NavLink>
                        </NavItem>
                        <NavItem className="px-4">
                            <NavLink href="/">
                                <FontAwesomeIcon icon="caret-down" size="2x" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}
export default TopNav;