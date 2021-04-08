import React from 'react';
import logo from '../../../../public/img/logo.png';

const Header = () => {
    return (
        <div className="header center">
            <img className="header-img" src={logo} alt="logo" />
        </div>
    );
};

export default Header;
