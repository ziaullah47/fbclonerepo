import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { IPost } from "../common/types";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import CommentModule from "./commentModule/CommentModule";

interface IProp extends React.HTMLAttributes<HTMLElement> {
    post: IPost;
    editPostHandler: (data: IPost) => void;
    deletePostHandler: (id: number) => void;
    likePostHandler: (id: number) => void;
}

const FeedItem: React.FunctionComponent<IProp> = props => {

    const authContext = useContext(AuthContext);
    const {post, editPostHandler, deletePostHandler, likePostHandler} = props;

    const klass = post.isLiked ? "text-primary" : "";

    return(
        <Card key={post.id}>
                <CardBody className="pt-2 pb-1">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <Avatar url={authContext.currentUser?.profilePhoto} />
                            <strong className="pl-2">{post.user.firstName + " " + post.user.lastName}</strong>
                        </div>
                        <div>
                            <UncontrolledDropdown>
                                <DropdownToggle className="btn btn-light">
                                    <FontAwesomeIcon icon="ellipsis-h" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => editPostHandler(post)}>
                                        <FontAwesomeIcon icon="pencil-alt" />
                                        <span className="pl-2">Edit Post</span>
                                    </DropdownItem>
                                    <DropdownItem onClick={() => deletePostHandler(post.id)}>
                                        <FontAwesomeIcon icon="trash-alt" />
                                        <span className="pl-2">Move to trash</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    <div>
                        {post.content}
                    </div>
                    <div>
                        <hr className="p-0 my-2"></hr>
                        <div className="d-flex justify-content-between">
                            {post.totalLikes > 0 ?
                                <div className="pl-2">
                                    <FontAwesomeIcon icon="thumbs-up" color="#1877F2" />
                                    <span className="pl-1">{post.totalLikes}</span>
                                    {post.isLiked ? <span className="ml-2">You</span> : ""}
                                </div> : <div></div>
                            }
                            <div>
                                {post.totalComments > 0 ? <span>{`${post.totalComments} Comments`}</span> : null}
                            </div>
                        </div>
                        <hr className="p-0 my-2"></hr>
                        <div className="d-flex justify-content-between px-5">
                            <div className={`hoverable-nav-link py-2 px-3 ${klass}`} onClick={() => likePostHandler(post.id)}>
                                <FontAwesomeIcon icon="thumbs-up" />
                                <h6 className="mx-2 my-0">Like</h6>
                            </div>
                            <div className="hoverable-nav-link py-2 px-3">
                                <FontAwesomeIcon icon="comment-alt" />
                                <h6 className="mx-2 my-0">Comment</h6>
                            </div>
                            <div className="hoverable-nav-link py-2 px-3">
                                <FontAwesomeIcon icon="share" />
                                <h6 className="mx-2 my-0">Share</h6>
                            </div>
                        </div>
                        <CommentModule postId={post.id} />
                    </div>
                </CardBody>
            </Card>
    );
}
export default FeedItem;