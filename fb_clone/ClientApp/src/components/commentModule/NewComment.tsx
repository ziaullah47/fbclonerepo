import React, { useState } from "react";
import { Input } from "reactstrap";
import Avatar from "../Avatar";

interface IProp extends React.HTMLAttributes<HTMLElement> {
    submitHanlder: (comment: string) => void;
}

const NewComment: React.FunctionComponent<IProp> = props => {

    const [newComment, setNewComment] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.submitHanlder(newComment);
            setNewComment("");
        }
    }
    return (
        <div className="d-flex my-2">
            <Avatar url="https://avatars.githubusercontent.com/u/4953463?v=4" />
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