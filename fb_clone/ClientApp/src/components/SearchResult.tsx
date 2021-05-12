import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { IUser } from "../common/types";
import { parseQueryParams } from "../common/utils/QueryParset";
import UserService from "../services/UserService";
import Avatar from "./Avatar";
import TopNav from "./TopNav";

interface IProp extends RouteComponentProps, React.HtmlHTMLAttributes<HTMLElement> {
}

const SearchResult: React.FunctionComponent<IProp> = props => {
    const userService = new UserService()

    const queryParams = props.location.search;
    let params = parseQueryParams(queryParams);

    const [searchResult, setSearchResult] = useState<IUser[]>([]);

    useEffect(() => {
        userService.SearchUser(params.q).then(resp => {
            setSearchResult(resp.data);
        })
    }, [queryParams])

    const getSearchResult = () => {
        return searchResult.map(user => {
            return (
                <div key={user.id} className="search-item d-flex align-items-center">
                    <Avatar url={user.profilePhoto} />
                    <div className="ml-2">
                        <h5>{user.firstName + " " + user.lastName}</h5>
                    </div>
                </div>
            );
        })
    }

    return (<div className="search-result">
        {getSearchResult()}
    </div>);
}
export default SearchResult;


