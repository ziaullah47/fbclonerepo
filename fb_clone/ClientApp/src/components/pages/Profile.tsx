import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ModalHeader, ModalBody, Form, Button, Input, NavLink, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Modal from "reactstrap/es/Modal";
import { IFriendAddRequest, IUser } from "../../common/types";
import { AuthContext } from "../../contexts/AuthContext";
import UserService from "../../services/UserService";
import Avatar from "../Avatar";
import Divider from "../Divider";
import Feeds from "../Feeds";

interface MatchParams {
    id: string;
}

interface IProp extends React.HtmlHTMLAttributes<HTMLElement>, RouteComponentProps<MatchParams> {

}
enum ModalType {
    "Cover" = "Cover",
    "Profile" = "Profile"
}
enum TabEnum {
    "Posts" = "Posts",
    "Friends" = "Friends"
}

const Profile: React.FunctionComponent<IProp> = props => {

    const userId = +props.match.params.id;

    const authContext = useContext(AuthContext);
    const userService = new UserService();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedModal, setSelectedModal] = useState<ModalType>(ModalType.Profile);
    const [friends, setFriends] = useState<IUser[]>([]);
    const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.Posts);
    const [user, setUser] = useState<IUser | null>(null);
    const [isMyFriend, setIsMyFriend] = useState<boolean>(false);


    useEffect(() => {
        userService.GetUser(userId).then(resp => {
            setUser(resp.data);
            setSelectedTab(TabEnum.Posts)
        }).catch(err => {
            console.log("user load error:" + err);
        });

        userService.IsMyFriend(userId).then(resp => {
            setIsMyFriend(resp.data.isFriend);
        })
    }, [userId])

    const handleUploadIconClick = (type: ModalType) => {
        setSelectedModal(type);
        setShowModal(!showModal);
    }

    const uploadPhoto = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            let data: FormData = new FormData();
            data.append("file", selectedFile, "profile_photo")
            if (selectedModal === ModalType.Cover) {
                userService.UploadCoverPhoto(data).then(resp => {
                    authContext.login(resp.data);
                    setShowModal(false);
                })
            } else {
                userService.UploadProfilePhoto(data).then(resp => {
                    authContext.login(resp.data);
                    setShowModal(false);
                })
            }
        }
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    }

    const getModalHeader = () => {
        let header = "Update Profile Photo";
        if (selectedModal === ModalType.Cover) {
            header = "Update Cover Photo";
        }
        return header;
    }

    const handleFriendsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setSelectedTab(TabEnum.Friends);
        userService.GetFriends(userId).then(resp => {
            setFriends(resp.data);
        }).catch(err => {
            console.log("friends fetching error: ", err);
        })
    }

    const handlePostsClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setSelectedTab(TabEnum.Posts);
    }

    const handleUnfriend = (friend: IUser) => {
        if (authContext.currentUser) {
            let data: IFriendAddRequest = {
                fromId: authContext.currentUser.id,
                toId: friend.id
            }
            userService.AddFriend(authContext.currentUser.id, data).then(resp => {
                let frnds = [...friends];
                let idx = frnds.findIndex(f => f.id === friend.id);
                frnds.splice(idx, 1);
                setFriends(frnds);
            }).catch(err => {
                console.log("unfrieending error ", err);
            })
        }
    }

    const getUnfriendDropdown = (friend: IUser) => {
        if (authContext.currentUser && authContext.currentUser.id === userId) {
            return <UncontrolledDropdown>
                <DropdownToggle className="btn btn-light">
                    <FontAwesomeIcon icon="ellipsis-h" />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => handleUnfriend(friend)}>
                        <FontAwesomeIcon icon="trash" />
                        <span className="pl-2">Unfriend</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        }
        return null;
    }

    const getFriendsContent = () => {
        return friends.map(friend => {
            return (
                <div key={friend.id} className="friend-card d-flex">
                    <div className="d-flex align-items-center flex-grow-1">
                        {friend.profilePhoto.length === 0 ?
                            <FontAwesomeIcon icon={['far', 'user']} size="3x" /> : <img src={`data:image/png;base64, ${friend.profilePhoto}`} alt="profile"/>
                        }
                        <Link to={`/profile/${friend.id}`} className="ml-2">
                            <h5>{friend.firstName + " " + friend.lastName}</h5>
                        </Link>
                    </div>
                    {getUnfriendDropdown(friend)}
                </div>
            );
        })
    }
    const getPostContent = () => {
        return <Feeds
            userId={userId}
            displayNewPost={authContext.currentUser && authContext.currentUser.id === userId ? true : false} />
    }

    const getCoverPhotUploadIcon = () => {
        if (authContext.currentUser && authContext.currentUser.id === userId) {
            return <div className="cover-upload-icon" onClick={() => handleUploadIconClick(ModalType.Cover)}>
                <FontAwesomeIcon icon="camera" size="2x" />
                <strong className="ml-2">Edit Cover Photo</strong>
            </div>
        }
        return null;
    }

    const getProfilePhotoUploadIcon = () => {
        if (authContext.currentUser && authContext.currentUser.id === userId) {
            return (
                <div className="profile-upload-icon" onClick={() => handleUploadIconClick(ModalType.Profile)}>
                    <FontAwesomeIcon icon="camera" size="2x" />
                </div>
            );
        }
        return null;
    }

    if (user === null) {
        return null;
    }

    const getFriendButton = () => {
        if (authContext.currentUser?.id === userId) {
            return null;
        }

        if (isMyFriend) {
            return <Button type="button" color="secondary" size="sm">
                <FontAwesomeIcon icon="user-times" />
                <span className="ml-2">Unfriend</span>
            </Button>
        }
        return <Button type="button" color="primary" size="sm">
            <FontAwesomeIcon icon="user-plus" />
            <span className="ml-2">Add Friend</span>
        </Button>
    }

    const handleAddFriendClick = () => {
        if (authContext.currentUser) {
            let data: IFriendAddRequest = {
                fromId: authContext.currentUser?.id,
                toId: userId
            }
            userService.AddFriend(authContext.currentUser.id, data).then(resp => {
                setIsMyFriend(!isMyFriend);
            });
        }
    }

    return (
        <div className="profile-page">
            <div className="profile-top">
                <div className="profile-top-container">
                    <div className="cover-photo-section">
                        <div className="cover-photo">
                            <img src={`data:image/png;base64, ${user?.coverPhoto}`}
                                alt="cover"
                            />
                        </div>
                        {getCoverPhotUploadIcon()}
                    </div>
                    <div className="profile-page-avatar">
                        <Avatar
                            href={"/profile/" + user?.id}
                            src={user?.profilePhoto}
                            width="120"
                            height="120" />
                        {getProfilePhotoUploadIcon()}
                    </div>
                    <div className="profile-bio">
                        <h4>{user?.firstName + " " + user?.lastName}</h4>
                    </div>

                    <div className="dropdown-divider" />
                    <Divider />

                    <div className="profile-nav">
                        <Nav>
                            <NavItem className={selectedTab === TabEnum.Posts ? "selected-tab" : ""}>
                                <NavLink href="/profile" onClick={handlePostsClick}>Post</NavLink>
                            </NavItem>
                            <NavItem className={selectedTab === TabEnum.Friends ? "selected-tab" : ""}>
                                <NavLink href="/friends" onClick={handleFriendsClick}>Friends</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={handleAddFriendClick}>
                                    {getFriendButton()}
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
            </div>
            <div className="profile-bottom">
                <div className="profile-content-holder flex-grow-1">
                    {selectedTab === TabEnum.Posts ? getPostContent() : getFriendsContent()}
                </div>
            </div>

            <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} backdrop className="create-post-modal">
                <ModalHeader toggle={() => setShowModal(!showModal)}>{getModalHeader()}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={uploadPhoto}>
                        <Input type="file" onChange={onFileChange} />
                        <Button type="submit" className="my-2" color="primary" block disabled={selectedFile ? false : true}>Upload</Button>
                    </Form>
                </ModalBody>
            </Modal>

        </div>


    );
}

export default Profile;