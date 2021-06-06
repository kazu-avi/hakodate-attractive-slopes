import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../UIKit';
import { AppBar, Box, Chip, Container, Tab, Tabs } from '@material-ui/core';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

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

const PostListTabs = (props) => {
    const [value, setValue] = useState(0);

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
                    <Tab label="全ての投稿を見る" icon={<PhotoCameraIcon />} {...a11yProps(0)} />
                    <Tab label="坂の名前ごとに見る" icon={<FilterHdrIcon />} {...a11yProps(1)} />
                    <Tab label="タグごとに見る" icon={<LocalOfferIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel className="center" value={value} index={0}>
                <PrimaryButton label={'新着順'} onClick={() => props.newestClick()} />
                <span className="margin-20" />
                <PrimaryButton label={'ランダム'} onClick={() => props.randomClick()} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.categories.map((category) => (
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<FilterHdrIcon />}
                        label={category.name}
                        key={category.id}
                        onClick={() => props.categoriesClick(category.id)}
                    />
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.tags.map((tag) => (
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<LocalOfferIcon />}
                        label={tag.name}
                        key={tag.id}
                        onClick={() => props.tagsClick(tag.id)}
                    />
                ))}
            </TabPanel>
        </div>
    );
};

export default PostListTabs;
