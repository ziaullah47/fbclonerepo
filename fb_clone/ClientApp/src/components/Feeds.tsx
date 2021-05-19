import React, { FormEvent, useEffect, useState } from "react";
import { IPost, IPostCreateRequest, IPostUpdateRequest } from "../common/types";
import PostService from "../services/PostService";
import FeedItem from "./FeedItem";
import PostModal from "./modals/PostModal";
import NewPost from "./NewPost";

interface IProp extends React.HTMLAttributes<HTMLElement> {
    userId?: number;
    displayNewPost: boolean;
}

const Feeds: React.FunctionComponent<IProp> = props => {

    const postService = new PostService();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [postText, setPostText] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingPostId, setEditingPostId] = useState<number>(0);



    useEffect(() => {
        if (props.userId) {
            postService.GetPostsByUserId(props.userId).then(resp => {
                setPosts(resp.data);
            }).catch(err => {
                console.log("Post fetching error: ", err);
            })
        } else {
            postService.GetPosts().then(resp => {
                setPosts(resp.data);
            }).catch(err => {
                console.log("Post fetching error: ", err);
            })
        }
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen);
        setPostText("");
        setEditingPostId(0);
    };

    const createOrUpdatePost = (e: FormEvent) => {
        e.preventDefault();
        if (editingPostId <= 0) {
            var data: IPostCreateRequest = { content: postText };
            postService.CreatePost(data).then(resp => {
                setPostText("");
                setIsOpen(false);
                setEditingPostId(0);
                setPosts([resp.data, ...posts]);
            }).catch(err => {
                console.log("Post submit failed: ", err);
            })
        } else {
            var updateData: IPostUpdateRequest = { id: editingPostId, content: postText };
            postService.UpdatePost(editingPostId, updateData).then(resp => {
                let interPosts = [...posts];
                let foundPost = interPosts.findIndex(x => x.id === resp.data.id);
                interPosts[foundPost] = resp.data;
                setPosts(interPosts);
                setPostText("");
                setIsOpen(false);
                setEditingPostId(0);
            }).catch(err => {
                console.log("update post error = ", err);
            })
        }
    }

    const likePost = (postId: number) => {
        postService.LikePost(postId).then(resp => {
            let interPosts = [...posts];
            let foundPost = interPosts.findIndex(x => x.id === postId);
            interPosts[foundPost] = resp.data;
            setPosts(interPosts);
        }).catch(err => {
            console.log("error while post like: ", err);
        })
    }

    const editPost = (post: IPost) => {
        setIsOpen(!isOpen);
        setPostText(post.content);
        setEditingPostId(post.id);
    }

    const deletePost = (id: number) => {
        postService.DeletePost(id).then(resp => {
            let interPosts = [...posts];
            let foundPost = interPosts.findIndex(x => x.id === id);
            interPosts.splice(foundPost, 1);
            setPosts(interPosts);
        }).catch(err => {
            console.log("Delete post error: ", err);
        })
    }

    const postCards = posts.map(p => {
        return (
            <FeedItem key={p.id} post={p} editPostHandler={editPost} deletePostHandler={deletePost} likePostHandler={likePost} />
        );
    })

    const getNewpostContainer = () => {
        if (props.displayNewPost) {
            return <NewPost newPostHandler={toggle} />
        }
        return null;
    }

    return (
        <React.Fragment>
            {getNewpostContainer()}
            {postCards}
            <PostModal
                defaultValue={postText}
                isOpen={isOpen}
                toggleHandler={toggle}
                submitHandler={createOrUpdatePost}
                onChangeHandler={newVal => setPostText(newVal)}
            />
        </React.Fragment>
    );
}
export default Feeds;