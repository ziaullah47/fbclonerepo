import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

interface IProps extends RouteProps {
    component: any;
}

const PrivateRoute: React.FunctionComponent<IProps> = props => {
    const authContext = useContext(AuthContext);
    const { component: Component, ...rest } = props;

    let hasAccess = authContext.isAuthenticate;

    return (
        <Route
            {...rest}
            render={props =>
                hasAccess ? (
                    <Component
                        {...props}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                )
            }
        ></Route>
    );
};

export default PrivateRoute;
