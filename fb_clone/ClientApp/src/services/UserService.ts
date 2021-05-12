import { AxiosPromise, AxiosResponse } from "axios";
import { API_BASE_DOMAIN } from "../common/Constants";
import { IUser } from "../common/types";
import HttpRequest from "./HttpRequest";

class UserService {
    private  httpRequest:HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    public async SearchUser(query: string) : Promise<AxiosResponse<IUser[]>> {
        const url = "/search?query="+query;
        return await this.httpRequest.get<IUser[]>(url);
    }

    public async GetCurrentUser() : Promise<AxiosResponse<IUser>> {
        const url = "/users/current_user";
        return await this.httpRequest.get<IUser>(url);
    }

    public async UploadProfilePhoto(file: FormData):  Promise<AxiosResponse<IUser>>  {
        const url = "/users/upload_profile_photo";
        return await this.httpRequest.post<FormData, IUser>(url, file);
    }

    public async UploadCoverPhoto(file: FormData):  Promise<AxiosResponse<IUser>>  {
        const url = "/users/upload_cover_photo";
        return await this.httpRequest.post<FormData, IUser>(url, file);
    }
}
export default UserService;