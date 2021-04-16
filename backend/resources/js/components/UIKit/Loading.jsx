import React from 'react';
import { useSelector } from 'react-redux';
import { getIsBeingLoaded, getLoadingText } from '../../reducks/loading/selectors';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ children }) => {
    const selector = useSelector((state) => state);
    const isBeingLoaded = getIsBeingLoaded(selector);
    const loadingText = getLoadingText(selector);
    console.log(isBeingLoaded);

    return (
        <>
            {isBeingLoaded ? (
                <section className="small-section center">
                    <CircularProgress />
                    <p>{loadingText}</p>
                </section>
            ) : (
                children
            )}
        </>
    );
};

export default Loading;
