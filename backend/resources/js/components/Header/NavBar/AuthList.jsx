import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getUsername, getUserImage } from '../../../reducks/users/selector';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import FaceIcon from '@material-ui/icons/Face';
import InfoIcon from '@material-ui/icons/Info';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import SchoolIcon from '@material-ui/icons/School';

const AuthList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const username = getUsername(selector);
    const userImage = getUserImage(selector);

    return (
        <List>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/mypage'))}>
                <ListItemAvatar>
                    {userImage ? <Avatar alt="ユーザー画像" src={userImage} /> : <FaceIcon />}
                </ListItemAvatar>
                <ListItemText primary={username + 'さん'} secondary={'マイページへ'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/'))}>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={'About'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/create'))}>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary={'投稿する'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/'))}>
                <ListItemIcon>
                    <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={'坂道を知る'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/'))}>
                <ListItemIcon>
                    <MonochromePhotosIcon />
                </ListItemIcon>
                <ListItemText primary={'みんなの投稿'} />
            </ListItem>
            <Divider />
        </List>
    );
};

export default AuthList;
