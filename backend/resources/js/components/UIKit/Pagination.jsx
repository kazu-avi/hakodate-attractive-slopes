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
    return (
        <div className="center">
            <ReactPagination
                className={classes.root}
                count={props.count}
                variant="outlined"
                shape="rounded"
                disabled={props.disabled}
                onChange={(event, page) => props.onChange(page)}
                page={props.page}
            />
        </div>
    );
};

export default Pagination;
