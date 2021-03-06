import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUsername, getUserImage } from '../reducks/users/selector';
import { userDelete } from '../reducks/users/operations';
import { MyPageAvater, MyPageTabs } from '../components/MyPage';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { PrimaryButton, SharpEdgeButton, Breadcrumb, Helmet } from '../components/UIKit';
import { push } from 'connected-react-router';

const MyPage = () => {
    const [myPostList, setMyPostList] = useState([]);
    const [myLikesList, setMyLikesList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [likesTotalPage, setLikesTotalPage] = useState(1);
    const [postsPage, setPostsPage] = useState(1);
    const [likesPage, setLikesPage] = useState(1);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const username = getUsername(selector);
    const userImage = getUserImage(selector);

    const getMyPosts = useCallback(
        async (page = postsPage) => {
            dispatch(showLoadingAction());
            setPostsPage(page);
            const url = 'https://hakodate-slopes.com/api/v1/posts/users/' + uid + '?page=' + page;
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
        },
        [getMyPosts]
    );

    const getMyLikes = useCallback(
        async (page = likesPage) => {
            dispatch(showLoadingAction());
            setLikesPage(page);
            const url = 'https://hakodate-slopes.com/api/v1/posts/' + uid + '/likes/?page=' + page;
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
                    setLikesTotalPage(responseJson.last_page);
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [getMyLikes]
    );

    useEffect(() => {
        getMyPosts();
        getMyLikes();
    }, []);

    return (
        <>
            <Helmet title={username + '???????????????????????? | HAKODATE ATTRACTIVE SLOPES'} />
            <section className="large-section">
                <Breadcrumb text={username + '????????????????????????'} />
            </section>
            <section className="small-section center">
                <MyPageAvater img={userImage} />
                <h2>{username}????????????????????????</h2>
                {uid !== 1 ? (
                    <PrimaryButton onClick={() => dispatch(push('/useredit'))} label={'????????????'} />
                ) : (
                    <p>????????????????????????????????????????????????????????????????????????????????????????????????</p>
                )}
                <span className="margin-20" />
                {uid !== 1 && <PrimaryButton onClick={() => dispatch(userDelete(uid))} label={'????????????'} />}
            </section>
            <section className="large-section">
                <MyPageTabs
                    myPostList={myPostList}
                    myLikesList={myLikesList}
                    page={postsPage}
                    likesPage={likesPage}
                    totalPage={totalPage}
                    likesTotalPage={likesTotalPage}
                    getMyPosts={getMyPosts}
                    getMyLikes={getMyLikes}
                />
            </section>
            <div className="spacer-medium" />
            <div className="large-section">
                <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
            </div>
        </>
    );
};

export default MyPage;
