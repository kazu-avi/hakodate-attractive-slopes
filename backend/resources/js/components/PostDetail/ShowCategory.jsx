import React from 'react';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import { Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const ShowCategory = (props) => {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>
                <span>
                    <FilterHdrIcon />
                </span>
                坂道名
            </h3>
            <Chip
                variant="outlined"
                size="small"
                icon={<FilterHdrIcon />}
                label={props.category.name}
                key={props.category.id}
                onClick={() => dispatch(push('/?category=' + props.category.id))}
            />
        </div>
    );
};

export default ShowCategory;
