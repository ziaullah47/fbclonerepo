import { AxiosResponse } from "axios";
import { HTTPStatusEnum, ILoginRequest, ITokenResponse,ISignUpRequest, IUser } from "../common/types";
import HttpRequest from "./HttpRequest";

class AuthService {
    private httpRequest: HttpRequest;

    constructor() {
        this.httpRequest = new HttpRequest();
    }

    public async logIn(data: ILoginRequest): Promise<AxiosResponse<ITokenResponse>> {
        const url = "/account/login";
        return await this.httpRequest.post<ILoginRequest, ITokenResponse>(url, data);
    }


    public async signup(data: ISignUpRequest): Promise<AxiosResponse<HTTPStatusEnum>> {
        const url = "/account/signup";
        return await this.httpRequest.post<ISignUpRequest, HTTPStatusEnum>(url, data);
    }

    public async getCurrentUser() : Promise<AxiosResponse<IUser>> {
        const url = "/users/current_user";
        return await this.httpRequest.get<IUser>(url);
    }

}
export default AuthService;