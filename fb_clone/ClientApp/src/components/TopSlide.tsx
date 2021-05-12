import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "./Avatar";

interface IPros extends React.HtmlHTMLAttributes<HTMLElement> { }

const TopSlide: React.FunctionComponent<IPros> = props => {
    const authContext = useContext(AuthContext);
    return (
        <div className="top-slide-wrapper">
            <div className="slide-item">
                <Avatar
                    url={authContext.currentUser?.profilePhoto}
                />
                <img className="slide-content" src="https://images.squarespace-cdn.com/content/v1/574dd66227d4bdb54a2f65e3/1467172778512-3W0CE7MKGLLQ2FQUYRTY/ke17ZwdGBToddI8pDm48kA9ZYb0lZpObybYj-EnNZh1Zw-zPPgdn4jUwVcJE1ZvWlAVL0qbjMx_lywF_DnRS0BFo1Rvjzurzh5MeYuGNmosp2ryTI0HqTOaaUohrI8PIUwYNdSOYQkXfiztRtsN_WOP63AzMjLbmalBWqFSsYKUKMshLAGzx4R3EDFOm1kBS/image-asset.jpeg"
                    alt="contet"
                />
            </div>
            <div className="slide-item">
                <Avatar url={authContext.currentUser?.profilePhoto} />
                <img className="slide-content" src="https://hollywoodlife.com/wp-content/uploads/2021/02/Tom-Cruise-Suri-Relationship-ftr.jpg?w=620" alt="contet" />
            </div>
            <div className="slide-item">
                <Avatar url={authContext.currentUser?.profilePhoto}
                />
                <img className="slide-content" alt="contet" src="https://cdn.vox-cdn.com/thumbor/88_uJNj2paYtpl9nYu13a56gobs=/0x52:3000x2302/1200x800/filters:focal(0x52:3000x2302)/cdn.vox-cdn.com/uploads/chorus_image/image/46975256/GettyImages-84196972.0.jpg" />
            </div>
            <div className="slide-item">
                <Avatar url={authContext.currentUser?.profilePhoto} />
                <img className="slide-content" alt="contet" src="https://images.squarespace-cdn.com/content/v1/574dd66227d4bdb54a2f65e3/1467172778512-3W0CE7MKGLLQ2FQUYRTY/ke17ZwdGBToddI8pDm48kA9ZYb0lZpObybYj-EnNZh1Zw-zPPgdn4jUwVcJE1ZvWlAVL0qbjMx_lywF_DnRS0BFo1Rvjzurzh5MeYuGNmosp2ryTI0HqTOaaUohrI8PIUwYNdSOYQkXfiztRtsN_WOP63AzMjLbmalBWqFSsYKUKMshLAGzx4R3EDFOm1kBS/image-asset.jpeg" />
            </div>
            <div className="slide-item">
                <Avatar url={authContext.currentUser?.profilePhoto} />
                <img className="slide-content" alt="contet" src="https://images.squarespace-cdn.com/content/v1/574dd66227d4bdb54a2f65e3/1467172778512-3W0CE7MKGLLQ2FQUYRTY/ke17ZwdGBToddI8pDm48kA9ZYb0lZpObybYj-EnNZh1Zw-zPPgdn4jUwVcJE1ZvWlAVL0qbjMx_lywF_DnRS0BFo1Rvjzurzh5MeYuGNmosp2ryTI0HqTOaaUohrI8PIUwYNdSOYQkXfiztRtsN_WOP63AzMjLbmalBWqFSsYKUKMshLAGzx4R3EDFOm1kBS/image-asset.jpeg" />
            </div>
        </div>
    );
}
export default TopSlide;