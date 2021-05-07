import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import logo from '../../../../public/img/logo.png';

const HeaderLogo = () => {
    const dispatch = useDispatch();
    return (
        <div className="header center">
            <img className="header-img" src={logo} alt="logo" onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default HeaderLogo;
