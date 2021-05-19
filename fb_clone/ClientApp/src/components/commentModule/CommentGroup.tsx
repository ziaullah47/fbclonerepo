import React from "react";
import { IComment } from "../../common/types";
import Comment from "./Comment"

interface IProp extends React.HTMLAttributes<HTMLElement> {
    postId: number;
    comments: IComment[];
    deleteHandler: (id: number) => void;
    likeHandler: (id: number) => void;
    updateHandler: (id: number, comment: string) => void;
}

const CommentGroup: React.FunctionComponent<IProp> = props => {

    const { comments, deleteHandler, likeHandler, updateHandler } = props;

    const commentItems = comments.map(cmt => {
        return <Comment
            key={cmt.id}
            comment={cmt}
            deleteHandler={deleteHandler}
            likeHandler={likeHandler}
            updateHandler={updateHandler}
        />;
    })

    return (
        <React.Fragment>
            {commentItems}
        </React.Fragment>
    )
}

export default CommentGroup;