import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Pagination } from '../UIKit';
import { MyPageCard } from './index';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
    root: {
        padding: 0,
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container className={classes.root}>
                    <Box p={2}>{children}</Box>
                </Container>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const MyPageTabs = (props) => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="自分の投稿した写真" icon={<EditIcon />} {...a11yProps(0)} />
                    <Tab label="自分の「行きたい！」写真" icon={<FavoriteIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className="grid-row">
                    {props.myPostList.length === 0 && <p className="center">関連する投稿はまだありません</p>}
                    {props.myPostList.map((post) => (
                        <MyPageCard
                            key={post.id}
                            postId={post.id}
                            isLiked={post.liked_by_user}
                            userImg={post.user.img}
                            image={post.file_path}
                            text={post.text}
                            category={post.category.name}
                            name={post.user.name}
                            date={post.updated_at}
                            tags={post.tags}
                            chipClick={() => dispatch(push('/categories/' + post.category_id))}
                            onClick={() => dispatch(push('/posts/' + post.id))}
                        />
                    ))}
                </div>
                {(() => {
                    if (props.totalPage === 1) {
                        return <></>;
                    } else {
                        return (
                            <Pagination
                                count={props.totalPage}
                                disabled={false}
                                onChange={props.getMyPosts}
                                page={props.page}
                            />
                        );
                    }
                })()}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="grid-row">
                    {props.myLikesList.length === 0 && <p className="center">関連する投稿はまだありません</p>}
                    {props.myLikesList.map((post) => (
                        <MyPageCard
                            key={post.id}
                            postId={post.id}
                            isLiked={post.liked_by_user}
                            userImg={post.user.img}
                            image={post.file_path}
                            text={post.text}
                            category={post.category.name}
                            name={post.user.name}
                            date={post.updated_at}
                            tags={post.tags}
                            chipClick={() => dispatch(push('/?category=' + post.category_id))}
                            onClick={() => dispatch(push('/posts/' + post.id))}
                        />
                    ))}
                </div>
                {(() => {
                    if (props.likesTotalPage === 1) {
                        return <></>;
                    } else {
                        return (
                            <Pagination
                                count={props.likesTotalPage}
                                disabled={false}
                                onChange={props.getMyLikes}
                                Page={props.likesPage}
                            />
                        );
                    }
                })()}
            </TabPanel>
        </div>
    );
};

export default MyPageTabs;
