import React from 'react';
import { Pagination as ReactPagination } from '@material-ui/lab/';

const Pagination = (props) => {
    return (
        <div>
            <ReactPagination
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
