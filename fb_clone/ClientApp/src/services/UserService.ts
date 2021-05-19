import { AxiosResponse } from "axios";
import { HTTPStatusEnum, IFriendAddRequest, IIsMyFriendResponse, IUser } from "../common/types";
import HttpRequest from "./HttpRequest";

class UserService {
    private httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    public async SearchUser(query: string): Promise<AxiosResponse<IUser[]>> {
        const url = "/search?query=" + query;
        return await this.httpRequest.get<IUser[]>(url);
    }

    public async GetUser(id: number): Promise<AxiosResponse<IUser>> {
        const url = "/users/" + id;
        return await this.httpRequest.get<IUser>(url);
    }

    public async IsMyFriend(id: number): Promise<AxiosResponse<IIsMyFriendResponse>> {
        const url = "/users/" + id + "/is_my_friend";
        return await this.httpRequest.get<IIsMyFriendResponse>(url);
    }

    public async GetCurrentUser(): Promise<AxiosResponse<IUser>> {
        const url = "/users/current_user";
        return await this.httpRequest.get<IUser>(url);
    }

    public async UploadProfilePhoto(file: FormData): Promise<AxiosResponse<IUser>> {
        const url = "/users/upload_profile_photo";
        return await this.httpRequest.post<FormData, IUser>(url, file);
    }

    public async UploadCoverPhoto(file: FormData): Promise<AxiosResponse<IUser>> {
        const url = "/users/upload_cover_photo";
        return await this.httpRequest.post<FormData, IUser>(url, file);
    }

    public async GetFriends(id: number): Promise<AxiosResponse<IUser[]>> {
        const url = "/users/" + id + "/friends";
        return await this.httpRequest.get<IUser[]>(url);
    }

    public async AddFriend(id: number, data: IFriendAddRequest): Promise<AxiosResponse<HTTPStatusEnum>> {
        const url = "/users/" + id + "/add_friend";
        return await this.httpRequest.post<IFriendAddRequest, HTTPStatusEnum>(url, data);
    }

}
export default UserService;