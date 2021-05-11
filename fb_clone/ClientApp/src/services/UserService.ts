import { AxiosPromise, AxiosResponse } from "axios";
import { API_BASE_DOMAIN } from "../common/Constants";
import { IUser } from "../common/types";
import HttpRequest from "./HttpRequest";

class UserService {
    private  httpRequest:HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }
}
export default UserService;