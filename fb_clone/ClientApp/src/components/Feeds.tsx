import React, { FormEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PAGE_NUMBER, PAGE_SIZE } from "../common/Constants";
import { IPagedList, IPagedMetaData, IPost, IPostCreateRequest, IPostUpdateRequest } from "../common/types";
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
    const [pageMeta, setPageMeta] = useState<IPagedMetaData>(
        {
            pageNumber: PAGE_NUMBER,
            pageSize: PAGE_SIZE,
            totalPages: 0,
            totalRecords: 0,
            hasNextPage: false,
            hasPreviousPage: false,
            isFirstPage: false,
            isLastPage: false
        }
    );
    const [postText, setPostText] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingPostId, setEditingPostId] = useState<number>(0);

    useEffect(() => {
        if (props.userId) {
            postService.GetPostsByUserId(props.userId, pageMeta.pageNumber, pageMeta.pageSize).then(resp => {
                setPosts([...posts, ...resp.data.items]);
                setPageMeta({ ...resp.data });
            }).catch(err => {
                console.log("Post fetching error: ", err);
            })
        } else {
            postService.GetPosts(pageMeta.pageNumber, pageMeta.pageSize).then(resp => {
                setPosts([...posts, ...resp.data.items]);
                setPageMeta({ ...resp.data });
            }).catch(err => {
                console.log("Post fetching error: ", err);
            })
        }
    }, [pageMeta.pageNumber]);

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

    const getPostCards = () => {
        return posts.map(p => {
            return (
                <FeedItem key={p.id} post={p} editPostHandler={editPost} deletePostHandler={deletePost} likePostHandler={likePost} />
            );
        });
    }

    const getNewpostContainer = () => {
        if (props.displayNewPost) {
            return <NewPost newPostHandler={toggle} />
        }
        return null;
    }

    return (
        <React.Fragment>
            {getNewpostContainer()}
            <InfiniteScroll
                dataLength={posts.length}
                next={() => setPageMeta({ ...pageMeta, pageNumber: pageMeta.pageNumber + 1 })}
                hasMore={pageMeta.hasNextPage}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {getPostCards()}
            </InfiniteScroll>
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