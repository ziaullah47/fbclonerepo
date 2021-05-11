import { AxiosResponse } from "axios";
import { HTTPStatusEnum, IComment, ICommentCreateRequest, ICommenUpdateRequest } from "../common/types";
import HttpRequest from "./HttpRequest";

class CommentService {
    private httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();

    }

    public async GetPostComments(postId: number): Promise<AxiosResponse<IComment[]>> {
        const url = "/posts/" + postId + "/comments";
        return await this.httpRequest.get<IComment[]>(url);
    }

    public async GetReplies(postId: number, commentId: number): Promise<AxiosResponse<IComment[]>> {
        const url = "/posts/" + postId + "/comments/" + commentId + "/replies";
        return await this.httpRequest.get<IComment[]>(url);
    }

    public async CreatePostComment(postId: number, data: ICommentCreateRequest): Promise<AxiosResponse<IComment>> {
        const url = "/posts/" + postId + "/comments";
        return await this.httpRequest.post<ICommentCreateRequest, IComment>(url, data);
    }

    public async UpdateComment(postId: number, commentId: number, data: ICommenUpdateRequest) {
        const url = "/posts/" + postId + "/comments/" + commentId;
        return await this.httpRequest.put<ICommenUpdateRequest, IComment>(url, data);
    }

    public async DeleteComment(postId: number, commentId: number) {
        const url = "/posts/" + postId + "/comments/" + commentId;
        return await this.httpRequest.delete<HTTPStatusEnum>(url);
    }

    public async LikeComment(postId: number, commentId: number): Promise<AxiosResponse<IComment>> {
        const url = "/posts/" + postId + "/comments/" + commentId + "/like";
        return await this.httpRequest.post<{}, IComment>(url, {});
    }
}
export default CommentService;