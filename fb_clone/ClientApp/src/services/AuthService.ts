import { AxiosResponse } from "axios";
import { API_BASE_DOMAIN } from "../common/Constants";
import { HTTPStatusEnum, ILoginRequest, ILoginResponse,ISignUpRequest } from "../common/types";
import CookieService from "./CookieService";
import HttpRequest from "./HttpRequest";

class AuthService {
    private httpRequest: HttpRequest;
    private cookieService;

    constructor() {
        this.httpRequest = new HttpRequest();
        this.cookieService = new CookieService()
    }

    public async logIn(data: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> {
        const url = API_BASE_DOMAIN + "account/login";
        return await this.httpRequest.post<ILoginRequest, ILoginResponse>(url, data);
    }


    public async signup(data: ISignUpRequest): Promise<AxiosResponse<HTTPStatusEnum>> {
        const url = API_BASE_DOMAIN + "account/signup";
        return await this.httpRequest.post<ISignUpRequest, HTTPStatusEnum>(url, data);
    }

}
export default AuthService;