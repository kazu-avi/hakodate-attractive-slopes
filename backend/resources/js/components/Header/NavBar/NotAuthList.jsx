import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';
import SchoolIcon from '@material-ui/icons/School';

const NotAuthList = (props) => {
    const dispatch = useDispatch();
    return (
        <List>
            <Divider />
            <ListItem button onClick={() => props.toggleDialog(true)}>
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
            <ListItem button onClick={() => dispatch(push('/register'))}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'新規登録'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => dispatch(push('/login'))}>
                <ListItemIcon>
                    <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary={'ログイン'} />
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

export default NotAuthList;
