import React, {FormEvent, useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, Button } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../Avatar";

interface IProp extends React.HTMLAttributes<HTMLElement> {
    defaultValue: string;
    isOpen: boolean;
    toggleHandler: () => void;
    submitHandler: (e: FormEvent) => void;
    onChangeHandler: (newVal: string) => void;
}
const PostModal: React.FunctionComponent<IProp> = (props) => {

    const authContext = useContext(AuthContext);
    const fullName = authContext.currentUser?.firstName + " " + authContext.currentUser?.lastName;

    const minRows = 5;
    const maxRows = 15;
    const { defaultValue, isOpen, toggleHandler, submitHandler, onChangeHandler } = props;

    const [rows, setRows] = useState<number>(5);

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
        setRows(currentRows < maxRows ? currentRows : maxRows);
        // setPostText(event.target.value);
        onChangeHandler(event.target.value);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggleHandler} backdrop className="create-post-modal">
            <ModalHeader toggle={toggleHandler}>Create Post</ModalHeader>
            <ModalBody>
                <div className="create-post-avatar">
                    <Avatar width="40" height="40" url="https://avatars.githubusercontent.com/u/4953463?v=4" />
                    <span className="mx-2">{fullName}</span>
                </div>
                <div className="create-post-form">
                    <Form onSubmit={submitHandler}>
                        <textarea
                            className="form-control"
                            rows={rows}
                            value={defaultValue}
                            placeholder={`What's on your mind, ${authContext.currentUser?.firstName}`}
                            autoFocus={true}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" className="my-2" color="primary" block disabled={defaultValue.length <= 0}>Post</Button>
                    </Form>
                </div>
            </ModalBody>
        </Modal>

    );
}
export default PostModal;