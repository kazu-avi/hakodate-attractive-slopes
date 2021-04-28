import React from 'react';
import { useDispatch } from 'react-redux';
// import { getIsSignedIn, getUserId, getUsername } from '../reducks/users/selector';
import { OutlinedButton } from '../components/UIKit';
import { push } from 'connected-react-router';
import { logout } from '../reducks/users/operations';
import PostList from './PostList';

const Home = () => {
    const dispatch = useDispatch();
    // const selector = useSelector((state) => state);
    // console.log(selector);
    // const uid = getUserId(selector);
    // const username = getUsername(selector);
    // const isSignedIn = getIsSignedIn(selector);

    // useEffect(() => {
    //     if (!isSignedIn) {
    //         dispatch(checkAuthAtHome());
    //     }
    // }, []);

    return (
        <>
            {/* <p>こんにちは{username}さん</p>
            <p>ユーザーID:{uid}</p> */}
            <OutlinedButton label={'ログイン'} onClick={() => dispatch(push('/login'))} />
            <OutlinedButton label={'新規登録'} onClick={() => dispatch(push('/register'))} />
            <OutlinedButton label={'マイページ'} onClick={() => dispatch(push('/mypage'))} />
            <OutlinedButton label={'投稿する'} onClick={() => dispatch(push('/edit'))} />
            <OutlinedButton label={'ログアウト'} onClick={() => dispatch(logout())} />
            <PostList />
        </>
    );
};

export default Home;
