import React, { useContext, useState } from "react";
import { Input } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../Avatar";

interface IProp extends React.HTMLAttributes<HTMLElement> {
    submitHanlder: (comment: string) => void;
}

const NewComment: React.FunctionComponent<IProp> = props => {

    const authContext = useContext(AuthContext);

    const [newComment, setNewComment] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.submitHanlder(newComment);
            setNewComment("");
        }
    }
    return (
        <div className="d-flex my-2">
            <Avatar url={authContext.currentUser?.profilePhoto} />
            <Input
                type="text"
                className="custom-input ml-2"
                placeholder="Write a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyPress={handleKeyDown} />
        </div>
    );
}
export default NewComment;