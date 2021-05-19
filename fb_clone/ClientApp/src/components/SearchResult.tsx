import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { IFriendAddRequest, IUser } from "../common/types";
import { parseQueryParams } from "../common/utils/QueryParset";
import { AuthContext } from "../contexts/AuthContext";
import UserService from "../services/UserService";
import Avatar from "./Avatar";

interface IProp extends RouteComponentProps, React.HtmlHTMLAttributes<HTMLElement> {
}

const SearchResult: React.FunctionComponent<IProp> = props => {
    const userService = new UserService()
    const authContext = useContext(AuthContext);

    const queryParams = props.location.search;
    let params = parseQueryParams(queryParams);

    const [searchResult, setSearchResult] = useState<IUser[]>([]);

    useEffect(() => {
        userService.SearchUser(params.q).then(resp => {
            setSearchResult(resp.data);
        })
    }, [queryParams])

    const addFriend = (user: IUser) => {
        if (authContext.currentUser) {
            const data: IFriendAddRequest = {
                fromId: authContext.currentUser.id,
                toId: user.id
            }
            userService.AddFriend(user.id, data).then(resp => {
                // do something
            }).catch(err => {
                console.log("friend add err", err);
            })
        }
    }

    const getFriendAddButton = (user: IUser) => {
        if (authContext.isAuthenticate) {
            return <Button
                type="button"
                className="rounded-circle"
                onClick={() => addFriend(user)}>
                <FontAwesomeIcon icon="user-plus" />
            </Button>;
        }
        return null;
    }

    const getSearchResult = () => {
        return searchResult.map(user => {
            return (
                <div key={user.id} className="search-item">
                    <div className="d-flex align-items-center">
                        <Avatar src={user.profilePhoto} href={"/profile/" + user.id} />
                        <Link className="ml-2" to={"/profile/" + user.id}>
                            <h5>{user.firstName + " " + user.lastName}</h5>
                        </Link>
                    </div>
                    {getFriendAddButton(user)}
                </div>
            );
        })
    }

    return (<div className="search-result">
        {getSearchResult()}
    </div>);
}
export default SearchResult;


