import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUsername, getUserImage } from '../reducks/users/selector';
import { userDelete } from '../reducks/users/operations';
import { MyPageAvater, MyPageTabs } from '../components/MyPage';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { PrimaryButton } from '../components/UIKit';
import { push } from 'connected-react-router';

const MyPage = () => {
    const [myPostList, setMyPostList] = useState([]);
    const [myLikesList, setMyLikesList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);
    const userImage = getUserImage(selector);

    const getMyPosts = useCallback(async (id) => {
        dispatch(showLoadingAction());
        setPage(page);
        const url =
            'http://ec2-54-95-156-93.ap-northeast-1.compute.amazonaws.com/api/v1/posts/users/' + id + '?page=' + page;
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        await fetch(url, option)
            .then((response) => response.json())
            .then((responseJson) => {
                setMyPostList(responseJson.data);
                setTotalPage(responseJson.last_page);
                dispatch(hideLoadingAction());
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
            });
    }, []);

    const getMyLikes = useCallback(async (id) => {
        dispatch(showLoadingAction());
        setPage(page);
        const url =
            'http://ec2-54-95-156-93.ap-northeast-1.compute.amazonaws.com/api/v1/posts/' + id + '/likes/?page=' + page;
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        await fetch(url, option)
            .then((response) => response.json())
            .then((responseJson) => {
                setMyLikesList(responseJson.data);
                setTotalPage(responseJson.last_page);
                console.log(responseJson);
                dispatch(hideLoadingAction());
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
            });
    }, []);

    useEffect(() => {
        getMyPosts(uid);
        getMyLikes(uid);
    }, []);

    return (
        <>
            <section className="small-section center">
                <MyPageAvater img={userImage} />
                <h2>{username}さんのマイページ</h2>
                {uid !== 1 ? (
                    <PrimaryButton onClick={() => dispatch(push('/useredit'))} label={'ユーザー情報を編集する'} />
                ) : (
                    <p>ゲストユーザーログインでは、アカウントの編集・削除はできません。</p>
                )}
                <span className="margin-20" />
                {uid !== 1 && (
                    <PrimaryButton onClick={() => dispatch(userDelete(uid))} label={'アカウントを削除する'} />
                )}
            </section>
            <section className="large-section">
                <MyPageTabs myPostList={myPostList} myLikesList={myLikesList} />
            </section>
        </>
    );
};

export default MyPage;
