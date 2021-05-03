import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core';
import { MyPageCard } from './index';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container>
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

    console.log(props);
    console.log();

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
                    {props.myPostList.map((post) => (
                        <MyPageCard
                            key={post.id}
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
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="grid-row">
                    {props.myLikesList.map((post) => (
                        <MyPageCard
                            key={post.id}
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
            </TabPanel>
        </div>
    );
};

export default MyPageTabs;
