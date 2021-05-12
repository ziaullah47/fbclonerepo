import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { AlertVariant } from "../../common/types";
import { AlertContext } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";

interface IProps extends RouteProps {
    component: any;
    restricted?: boolean;
  }
  
  const PublicRoute: React.FunctionComponent<IProps> = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { component: Component, restricted, ...rest } = props;
  
    const isRestricted = authContext.isAuthenticate && restricted;
    if (isRestricted) {
      let msg = "Access denied";
      alertContext.show(msg, AlertVariant.DANGER);
    }
  
    return (
      <Route
        {...rest}
        render={props =>
          isRestricted ? (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          ) : (
            <Component
              {...props}
            />
          )
        }
      ></Route>
    );
  };
  
  export default PublicRoute;
  