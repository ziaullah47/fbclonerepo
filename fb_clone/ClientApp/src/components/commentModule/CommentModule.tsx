import React, { useEffect, useState } from "react";
import { IComment, ICommentCreateRequest, ICommenUpdateRequest } from "../../common/types";
import CommentService from "../../services/CommentService";
import CommentGroup from "./CommentGroup";
import NewComment from "./NewComment";

interface IProp extends React.AllHTMLAttributes<HTMLElement> {
    postId: number;
}

const CommentModule: React.FunctionComponent<IProp> = props => {
    const commentService = new CommentService();
    const { postId } = props;

    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        commentService.GetPostComments(postId).then(resp => {
            setComments(resp.data);
        }).catch(err => {
            console.log("comment fetching error: ", err);
        })
    }, [postId])

    const updateComment = (id: number, text: string) => {
        let interComments = [...comments];
        let idx = interComments.findIndex(i => i.id === id);

        let data: ICommenUpdateRequest = { id: id, content: text };
        commentService.UpdateComment(postId, id, data).then(resp => {
            interComments[idx] = resp.data;
            setComments(interComments);
        }).catch(err => {
            console.log("comment update error: ", err);
        })
    }

    const deleteComment = (id: number) => {
        commentService.DeleteComment(postId, id).then(resp => {
            let interComments = [...comments];
            let idx = interComments.findIndex(i => i.id === id);
            interComments.splice(idx, 1);
            setComments(interComments);
        }).catch(err => {
            console.log("delete comment error: ", err);
        })
    }

    const likeComment = (id: number) => {
        commentService.LikeComment(postId, id).then(resp => {
            let interComments = [...comments];
            let idx = interComments.findIndex(i => i.id === id);
            interComments[idx] = resp.data;
            setComments(interComments);
        }).catch(err => {
            console.log("comment like error: ", err);
        })
    }

    const createComment = (comment: string) => {
        let data: ICommentCreateRequest = { postId: postId, content: comment };
        commentService.CreatePostComment(postId, data).then(resp => {
            setComments([resp.data, ...comments])
        }).catch(err => {
            console.log("comment post error: ", err);
        })
    }


    return (
        <React.Fragment>
            <NewComment submitHanlder={createComment} />
            <CommentGroup
                postId={postId}
                comments={comments}
                deleteHandler={deleteComment}
                likeHandler={likeComment}
                updateHandler={updateComment}
            />
        </React.Fragment>
    );
}
export default CommentModule;