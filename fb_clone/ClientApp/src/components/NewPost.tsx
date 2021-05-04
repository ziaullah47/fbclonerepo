import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useContext, useState } from "react";
import { Button, Card, CardBody, CardFooter, Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";

interface IProp extends React.HtmlHTMLAttributes<HTMLAnchorElement> { }
const NewPost: React.FunctionComponent<IProp> = props => {

    const authContext = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [post, setPost] = useState<string>("");
    const [rows, setRows] = useState<number>(5);

    const minRows = 5;
    const maxRows = 15;

    const fullName = authContext.currentUser?.firstName + " " + authContext.currentUser?.lastName;

    const toggle = () => setIsOpen(!isOpen);

    const handleInputChange = (event: any) => {

        const textareaLineHeight = 24;

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }

        setPost(event.target.value);
        setRows(currentRows < maxRows ? currentRows : maxRows);
    }

    const handleCreatPostSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <React.Fragment>
            <Card className="new-post-holder">
                <CardBody className="new-post-top">
                    <Avatar width="40px" height="40px" url="https://avatars.githubusercontent.com/u/4953463?v=4" />
                    <div className="new-post-input-div" onClick={toggle}>What's on your mind, Junaid?</div>
                </CardBody>
                <CardFooter className="d-flex justify-content-between">
                    <div className="hoverable-nav-link p-2">
                        <FontAwesomeIcon icon="images" />
                        <h6 className="mx-2">Photo/Video</h6>
                    </div>
                    <div className="hoverable-nav-link p-2">
                        <FontAwesomeIcon icon="user-tag" />
                        <h6 className="mx-2">Tag Friend</h6>
                    </div>
                    <div className="hoverable-nav-link p-2">
                        <FontAwesomeIcon icon="smile" />
                        <h6 className="mx-2">Feeling/Activity</h6>
                    </div>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} toggle={toggle} backdrop className="create-post-modal">
                <ModalHeader toggle={toggle}>Create Post</ModalHeader>
                <ModalBody>
                    <div className="create-post-avatar">
                        <Avatar width="40px" height="40px" url="https://avatars.githubusercontent.com/u/4953463?v=4" />
                        <span className="mx-2">{fullName}</span>
                    </div>
                    <div className="create-post-form">
                        <Form onSubmit={handleCreatPostSubmit}>
                            <textarea
                                className="form-control"
                                rows={rows}
                                value={post}
                                placeholder={`What's on your mind, ${authContext.currentUser?.firstName}`}
                                autoFocus={true}
                                onChange={handleInputChange}
                            />
                            <Button type="submit" className="my-2" color="primary" block disabled={post.length <= 0}>Post</Button>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>

        </React.Fragment>
    );
}
export default NewPost;