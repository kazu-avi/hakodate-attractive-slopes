import React from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Chip } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const ShowTags = (props) => {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>
                <span>
                    <LocalOfferIcon />
                </span>
                タグ
            </h3>
            {props.tags.map((tag) => (
                <Chip
                    variant="outlined"
                    size="small"
                    icon={<LocalOfferIcon />}
                    label={tag.name}
                    key={tag.id}
                    onClick={() => dispatch(push('/?tag=' + tag.id))}
                />
            ))}
        </div>
    );
};

export default ShowTags;
