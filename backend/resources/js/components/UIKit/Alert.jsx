import React from 'react';
import { useSelector } from 'react-redux';
import { Alert as MuiAlert } from '@material-ui/lab';
import { getAlertText, getDisplayAlert, getDisplayMessage } from '../../reducks/alert/selectors';

const Alert = () => {
    const selector = useSelector((state) => state);
    const displayAlert = getDisplayAlert(selector);
    const displayMessage = getDisplayMessage(selector);
    const alertText = getAlertText(selector);

    return (
        <>
            {displayAlert && (
                <div className="alert">
                    <MuiAlert severity="warning">{alertText}</MuiAlert>
                </div>
            )}
            {displayMessage && (
                <div className="alert">
                    <MuiAlert severity="success">{alertText}</MuiAlert>
                </div>
            )}
            {!displayMessage && !displayMessage && <></>}
        </>
    );
};

export default Alert;
