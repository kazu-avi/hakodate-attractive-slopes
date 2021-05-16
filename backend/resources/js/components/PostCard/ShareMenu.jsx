import React, { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const ShareMenu = (props) => {
    const [twitterUrl, setTwiiterUrl] = useState('');
    const [fbUrl, setFbUrl] = useState('');

    const makeTwitterUrl = () => {
        const baseUrl = 'https://twitter.com/intent/tweet?';
        const shareText =
            '【函館の坂道をもっと楽しむための写真投稿サイト：HAKODATE ATTRACTIVE SLOPES】' +
            props.postUser +
            'さんの投稿「' +
            props.postText +
            '」を見る→';
        const text = ['text', shareText];
        const hashtags = ['hashtags', ['函館', '写真'].join(',')];
        const url = ['url', 'https://hakodate-slopes.com/posts/' + props.postId];
        const query = new URLSearchParams([text, hashtags, url]).toString();
        const twitterUrl = baseUrl + query;
        setTwiiterUrl(twitterUrl);
    };

    const makeFbUrl = () => {
        const baseUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
        const url = 'https://hakodate-slopes.com/posts/' + props.postId;
        const fbUrl = baseUrl + url;
        setFbUrl(fbUrl);
    };

    const twitterClick = () => {
        window.open(twitterUrl, '_blank');
    };

    const fbClick = () => {
        window.open(fbUrl, '_blank');
    };

    useEffect(() => {
        makeTwitterUrl();
        makeFbUrl();
    }, []);

    return (
        <>
            <Menu anchorEl={props.anchorEl} open={props.open} onClose={() => props.onClose()}>
                <MenuItem onClick={() => twitterClick()}>Twitterでシェア</MenuItem>
                <MenuItem onClick={() => fbClick()}>Facebookでシェア</MenuItem>
                <MenuItem onClick={() => props.onClose()}>Close</MenuItem>
            </Menu>
        </>
    );
};

export default ShareMenu;
