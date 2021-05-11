import { AxiosResponse } from "axios";
import { HTTPStatusEnum, IPost, IPostCreateRequest, IPostUpdateRequest } from "../common/types";
import HttpRequest from "./HttpRequest";

class PostService {

    private httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();

    }

    public async GetPosts() : Promise<AxiosResponse<IPost[]>>{
        const url = "/posts";
        return await this.httpRequest.get<IPost[]>(url);
    }

    public async CreatePost(data: IPostCreateRequest) : Promise<AxiosResponse<IPost>> {
        const url = "/posts";
        return await this.httpRequest.post<IPostCreateRequest, IPost>(url, data);
    }

    public async LikePost(id: number) : Promise<AxiosResponse<IPost>> {
        const url = "/posts/"+id+"/like";
        return await this.httpRequest.post<{}, IPost>(url, {});
    }

    public async UpdatePost(id: number, data: IPostUpdateRequest) : Promise<AxiosResponse<IPost>> {
        const url = "/posts/"+id;
        return await this.httpRequest.put<IPostCreateRequest, IPost>(url, data);
    }

    public async DeletePost(id: number) : Promise<AxiosResponse<HTTPStatusEnum>> {
        const url = "/posts/"+id;
        return await this.httpRequest.delete<HTTPStatusEnum>(url);
    }
}
export default PostService;