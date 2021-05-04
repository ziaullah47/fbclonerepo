
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelToken, CancelTokenSource } from "axios";
import { API_BASE_DOMAIN } from "../common/Constants";
import CookieService from "./CookieService";

class HttpRequest {

    private axiosInstance: AxiosInstance;
    private cookieService: CookieService;
    
    constructor() {
        const config: AxiosRequestConfig = { baseURL: API_BASE_DOMAIN };
        this.axiosInstance = axios.create(config);
    
        this.cookieService = new CookieService();
    }
    
    public get<TResp>(url: string, source?: CancelToken) : AxiosPromise<TResp> {
        return this.axiosInstance.get(url, this.axiosConfig());
    }

    public post<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.post(url, data, this.axiosConfig());
    }

    public put<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.put(url, data, this.axiosConfig());
    }

    public patch<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.patch(url, data, this.axiosConfig());
    }

    public delete<TResp>(url: string): AxiosPromise<TResp> {
        return this.axiosInstance.delete(url, this.axiosConfig());
    }

    private axiosConfig(source?: CancelTokenSource): AxiosRequestConfig {
        let accessToken = this.cookieService.get("accessToken");
        let headers = {};
    
        if (accessToken !== undefined) {
          headers = { Authorization: `Bearer ${accessToken}` };
        }
        if (source) {
          return { headers: headers, cancelToken: source.token };
        } else {
          return { headers: headers };
        }
      }
}
export default HttpRequest;