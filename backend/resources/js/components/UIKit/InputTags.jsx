import React from 'react';
import ReactTagInput from '@pathofdev/react-tag-input';

const InputTags = (props) => {
    return (
        <div>
            <ReactTagInput
                tags={props.tags}
                onChange={(newTags) => props.onChange(newTags)}
                placeholder={props.placeholder}
                editable={true}
            />
        </div>
    );
};

export default InputTags;
