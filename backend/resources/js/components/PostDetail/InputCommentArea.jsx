import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import commentRegister from '../Posts/commentRegister';
import { PrimaryButton, TextInput } from '../UIKit';

const InputCommentArea = (props) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const inputComment = useCallback(
        (event) => {
            setComment(event.target.value);
        },
        [inputComment]
    );

    return (
        <>
            <TextInput
                fullWidth={true}
                label={'コメントを入力してね！'}
                multiline={true}
                required={false}
                rows={3}
                type={'text'}
                value={comment}
                onChange={inputComment}
            />
            <div className="spacer-small" />
            <PrimaryButton
                label={'コメントを送信する'}
                onClick={() => {
                    dispatch(commentRegister(props.id, comment));
                    setComment([]);
                }}
            />
        </>
    );
};

export default InputCommentArea;
