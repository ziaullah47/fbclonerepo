import { AxiosPromise, AxiosResponse } from "axios";
import { API_BASE_DOMAIN } from "../common/Constants";
import { IUser } from "../common/types";
import HttpRequest from "./HttpRequest";

class UserService {
    private  httpRequest:HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    public async getCurrentUser() : Promise<AxiosResponse<IUser>> {
        const url = "/users/current_user";
        return await this.httpRequest.get<IUser>(url);
    }
}
export default UserService;