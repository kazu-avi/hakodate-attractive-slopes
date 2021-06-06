import React from 'react';
import { useSelector } from 'react-redux';
import { getIsBeingLoaded, getLoadingText } from '../../reducks/loading/selectors';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ children }) => {
    const selector = useSelector((state) => state);
    const isBeingLoaded = getIsBeingLoaded(selector);
    const loadingText = getLoadingText(selector);

    return (
        <>
            {isBeingLoaded && (
                <section className="loading-section">
                    <CircularProgress />
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </>
    );
};

export default Loading;
