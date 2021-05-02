import Cookies, { CookieSetOptions } from "universal-cookie/es6";

class CookieService {
    private cookies;

    constructor(){
        this.cookies = new Cookies();
    }

    public get(name:string) : string {
        return this.cookies.get(name);
    }

    public set(name: string, value: string | object, options?: CookieSetOptions): void {
        this.cookies.set(name, value, options)
    }

    public remove(name: string, options?: CookieSetOptions): void {
        this.cookies.remove(name, options);
    }
}
export default CookieService;