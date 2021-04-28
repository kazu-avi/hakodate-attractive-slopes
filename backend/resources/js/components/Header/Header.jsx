import React from 'react';
import { HeaderLogo, HeaderLogin, HeaderNav } from './index';

const Header = () => {
    return (
        <div className="large-section">
            <HeaderLogin />
            <HeaderLogo />
            <HeaderNav />
        </div>
    );
};

export default Header;
