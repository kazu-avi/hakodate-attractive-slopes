import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

const Helmet = (props) => {
    return (
        <>
            <ReactHelmet>
                <title>{props.title}</title>
            </ReactHelmet>
        </>
    );
};

export default Helmet;
