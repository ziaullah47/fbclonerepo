import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";

interface IProps extends RouteComponentProps { }
const TopNav: React.FunctionComponent<IProps> = (props) => {
    const authContext = useContext(AuthContext);

    const [isCollasped, setIsCollasped] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const toggleCollaspse = () => setIsCollasped(!isCollasped);
    const toogleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const seachOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.history.push("/search?q=" + searchQuery);
    }

    const handleLogout = () => {
        authContext.logout();
    }

    return (
        <Navbar color="light" fixed="top" light expand="md" className="shadow mb-2 bg-white rounded">
            <div className="nav-items">
                <div className="nav-items-left">
                    <NavbarBrand href="/">
                        <FontAwesomeIcon icon={['fab', 'facebook']} color="#0E8EF2" size="2x" />
                    </NavbarBrand>

                    <NavbarToggler onClick={toggleCollaspse} />
                    <Nav navbar>
                        <NavItem>
                            <Form onSubmit={seachOnSubmit}>
                                <div className="d-flex justify-content-center align-items-center nav-search">
                                    <FontAwesomeIcon icon="search" />
                                    <Input
                                        className="custom-input"
                                        type="search"
                                        placeholder="Search Facebook"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </Form>
                        </NavItem>
                    </Nav>
                </div>
                <Collapse isOpen={isCollasped} navbar className="nav-items-middle">
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
                <Collapse isOpen={isCollasped} navbar className="nav-items-right">
                    <Nav navbar >
                        <NavItem className="px-4">
                            <NavLink href="/profile" className="d-flex align-items-center justify-content-center">
                                <Avatar url={authContext.currentUser?.profilePhoto} width="40px" height="40px" />
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
                        <NavItem className="px-4 d-flex align-items-center">
                            <Dropdown isOpen={isDropdownOpen} toggle={toogleDropdown}>
                                <DropdownToggle tag="div">
                                    <FontAwesomeIcon icon="caret-down" size="2x" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={handleLogout}>
                                        <FontAwesomeIcon icon="sign-out-alt" />
                                        <span className="ml-3">Sign Out</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}
export default withRouter(TopNav);