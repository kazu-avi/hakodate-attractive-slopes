import React from 'react';

const HeaderLogin = (props) => {
    return (
        <>
            {props.isSignedIn ? (
                <div className="text-right">
                    <p>
                        こんにちは！{props.username}さん
                        <span>/ログアウト</span>
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default HeaderLogin;
