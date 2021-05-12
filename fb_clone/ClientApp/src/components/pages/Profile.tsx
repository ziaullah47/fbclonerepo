import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { ModalHeader, ModalBody, Form, Button, Input } from "reactstrap";
import Modal from "reactstrap/es/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import UserService from "../../services/UserService";
import Avatar from "../Avatar";
import TopNav from "../TopNav";

interface IProp extends React.HtmlHTMLAttributes<HTMLElement> {

}
enum ModalType {
    "Cover" = "Cover",
    "Profile" = "Profile"
}
const Profile: React.FunctionComponent<IProp> = props => {
    const authContext = useContext(AuthContext);
    const userService = new UserService();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedModal, setSelectedModal] = useState<ModalType>(ModalType.Profile);

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

    return (
        <div className="profile-page">
            <div className="profile-top">
                <div className="cover-photo-section">
                    <div className="cover-photo">
                        <img src={`data:image/png;base64, ${authContext.currentUser?.coverPhoto}`}
                            alt="cover"
                        />
                    </div>
                    <div className="cover-upload-icon" onClick={() => handleUploadIconClick(ModalType.Cover)}>
                        <FontAwesomeIcon icon="camera" size="2x" />
                        <strong className="ml-2">Edit Cover Photo</strong>
                    </div>
                </div>
                <div className="profile-page-avatar">
                    <Avatar width="120" height="120" url={authContext.currentUser?.profilePhoto} />
                    <div className="profile-upload-icon" onClick={() => handleUploadIconClick(ModalType.Profile)}>
                        <FontAwesomeIcon icon="camera" size="2x" />
                    </div>
                </div>
                <div className="profile-nav">Nav</div>
            </div>
            <div className="profile-bottom">
                <div className="">Info</div>
                <div className="">Posts</div>
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