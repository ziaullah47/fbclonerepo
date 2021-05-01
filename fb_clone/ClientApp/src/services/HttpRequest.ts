
import axios, { AxiosInstance, AxiosPromise, CancelToken } from "axios";

class HttpRequest {
    private axiosInstance: AxiosInstance;
    
    constructor() {
        this.axiosInstance = axios.create();
    }
    
    public get<TResp>(url: string, source?: CancelToken) : AxiosPromise<TResp> {
        return this.axiosInstance.get(url);
    }

    public post<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.post(url, data);
    }

    public put<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.put(url, data);
    }

    public patch<TReq, TResp>(url: string, data: TReq): AxiosPromise<TResp> {
        return this.axiosInstance.patch(url, data);
    }

    public delete<TResp>(url: string): AxiosPromise<TResp> {
        return this.axiosInstance.delete(url);
    }
}
export default HttpRequest;