import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from "reactstrap";
import { IComment, ICommentCreateRequest, ICommenUpdateRequest } from "../../common/types";
import CommentService from "../../services/CommentService";
import Avatar from "../Avatar";
import CommentGroup from "./CommentGroup";

interface IProp extends React.HtmlHTMLAttributes<HTMLElement> {
    comment: IComment;
    deleteHandler: (id: number) => void;
    likeHandler: (id: number) => void;
    updateHandler: (id: number, comment: string) => void;
}

const Comment: React.FunctionComponent<IProp> = props => {

    const commentService = new CommentService();

    const { comment, deleteHandler, likeHandler, updateHandler } = props;

    const [editing, setEditing] = useState<boolean>(false);
    const [showReply, setShowReply] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>("");
    const [updatedComment, setUpdatedComment] = useState<string>(comment.content);
    const [replies, setReplies] = useState<IComment[]>([]);

    const loadReplies = () => {
        commentService.GetReplies(comment.postId, comment.id).then(resp => {
            setReplies(resp.data);
        }).catch(err => {
            console.log("replies fetching error: ", err);
        })
    }

    useEffect(() => {
        loadReplies();
    }, [comment.id])

    const handleKeydown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            updateHandler(comment.id, updatedComment);
            setEditing(false);
        }
    }

    const getCommentInput = () => {
        if (editing) {
            return <Input
                className="custom-input"
                type="text"
                readOnly={!editing}
                value={updatedComment}
                onKeyDown={handleKeydown}
                onChange={e => setUpdatedComment(e.target.value)}
                autoFocus={editing}
            />
        }

        return <div>
            {comment.content}
        </div>

    }

    const getActionDropdown = () => {
        if (editing) {
            return null;
        }

        return (
            <div className="ml-3">
                <UncontrolledDropdown>
                    <DropdownToggle className="btn btn-light">
                        <FontAwesomeIcon icon="ellipsis-h" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setEditing(!editing)}>
                            <FontAwesomeIcon icon="pencil-alt" />
                            <span className="pl-2">Edit Comment</span>
                        </DropdownItem>

                        <DropdownItem onClick={() => deleteHandler(comment.id)}>
                            <FontAwesomeIcon icon="trash-alt" />
                            <span className="pl-2">Delete Comment</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }


    const getLikeReplyLinks = () => {
        if (editing) {
            return <small className="clickable text-primary" onClick={() => setEditing(!editing)}>Cancel</small>;
        }
        return (
            <div>
                <span className={`clickable ${comment.isLiked ? "text-primary" : ""}`} onClick={() => likeHandler(comment.id)}>Like</span>
                <span className="clickable ml-3" onClick={() => setShowReply(!showReply)}>Reply</span>
            </div>
        );
    }

    const addReply = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            let data: ICommentCreateRequest = {
                postId: comment.postId,
                parentId: comment.id,
                content: replyText
            }
            commentService.CreatePostComment(comment.postId, data).then(resp => {
                setReplies([resp.data, ...replies]);
                setReplyText("");
            })
        }
    }

    const getReplyInput = () => {
        if (showReply) {
            return <div className="d-flex my-2">
                <Avatar url="https://avatars.githubusercontent.com/u/4953463?v=4" />
                <Input
                    type="text"
                    className="custom-input ml-2"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    autoFocus={true}
                    onKeyPress={addReply} />
            </div>
        }
        return null;
    }

    const deleteReply = (id: number) => {
        commentService.DeleteComment(comment.postId, id).then(resp => {
            let interReplies = [...replies];
            let idx = interReplies.findIndex(x => x.id === id);
            interReplies.splice(idx, 1);
            setReplies(interReplies);
        }).catch(err => {
            console.log("reply delete error: ", err);
        })
    }

    const updateReply = (id: number, text: string) => {
        let data: ICommenUpdateRequest = {
            id: id,
            content: text
        }
        commentService.UpdateComment(comment.postId, id, data).then(resp => {
            let interReplies = [...replies];
            let idx = interReplies.findIndex(x => x.id === id);
            interReplies[idx] = resp.data;
            setReplies(interReplies);
        }).catch(err => {
            console.log("reply update error: ", err);
        })
    }

    const likeReply = (id: number) => {
        commentService.LikeComment(comment.postId, id).then(resp => {
            let interReplies = [...replies];
            let idx = interReplies.findIndex(x => x.id === id);
            interReplies[idx] = resp.data;
            setReplies(interReplies);
        }).catch(err => {
            console.log("reply like error: ", err);
        })
    }

    const getReplies = () => {
        return <CommentGroup
            postId={comment.postId}
            comments={replies}
            deleteHandler={deleteReply}
            updateHandler={updateReply}
            likeHandler={likeReply}
        />
    }

    return (
        <div className="d-flex">
            <Avatar url="https://avatars.githubusercontent.com/u/4953463?v=4" />
            <div className="flex-grow-1 ml-2">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1 comment-content">
                        {editing ? null : <strong>{comment.commentedBy.firstName + " " + comment.commentedBy.lastName}</strong>}
                        {getCommentInput()}
                    </div>
                    {getActionDropdown()}
                </div>
                {getLikeReplyLinks()}
                {getReplyInput()}
                {getReplies()}
            </div>
        </div>
    );
}

export default Comment;