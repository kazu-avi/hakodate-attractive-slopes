import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Pagination as ReactPagination } from '@material-ui/lab/';

const useStyles = makeStyles({
    root: {
        display: 'inline-block',
    },
});

const Pagination = (props) => {
    const classes = useStyles();
    const scrollToTop = () => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="center">
            <ReactPagination
                className={classes.root}
                count={props.count}
                variant="outlined"
                shape="rounded"
                disabled={props.disabled}
                onChange={(event, page) => {
                    props.onChange(page);
                    scrollToTop();
                }}
                page={props.page}
            />
        </div>
    );
};

export default Pagination;
