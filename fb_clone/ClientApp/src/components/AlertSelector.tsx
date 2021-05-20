import React, { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";
import FlashAlert from "./FlashAlert";

const AlertSelector: React.FunctionComponent = () => {
    const alertContext = useContext(AlertContext);

    if (alertContext.isShow && alertContext.message) {
        return <FlashAlert
            title={alertContext.message}
            errors={alertContext.errors}
            variant={alertContext.type}
            closeHandler={() => alertContext.close()}
            dismissible={alertContext.dismissable}
        />
    }
    return null;
}
export default AlertSelector