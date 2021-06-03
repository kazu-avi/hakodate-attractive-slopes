import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { SharpEdgeButton } from '../UIKit';
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogContent, Fab, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SchoolIcon from '@material-ui/icons/School';
import CreateIcon from '@material-ui/icons/Create';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FaceIcon from '@material-ui/icons/Face';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import logo from '../../../../public/img/logo.png';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: '#f2f4fb',
    },
    icon: {
        position: 'absolute',
        backgroundColor: '#C9CACA',
        width: 40,
        height: 40,
        top: 10,
        right: 10,
        zIndex: 99,
    },
    title: {
        fontSize: 26,
    },
    section: {
        fontSize: 20,
        paddingTop: 100,
        paddingBottom: 20,
    },
    image: {
        '& > svg': {
            width: 50,
            height: 50,
        },
    },
    text: {
        fontSize: 16,
        maxWidth: 500,
        margin: '0 auto',
    },
    logo: {
        margin: '0 auto',
    },
    button: {
        borderRadius: 0,
        backgroundColor: '#b0c4de',
        padding: '6px 16px',
        margin: '10px 20px',
        width: 200,
    },
});

const AboutDialog = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <Dialog open={props.open} onClose={() => props.toggleDialog(false)} fullWidth={true} maxWidth="lg">
            <DialogContent className={classes.root}>
                <Fab className={classes.icon} onClick={() => props.toggleDialog(false)}>
                    <CloseIcon />
                </Fab>
                <div className="spacer-medium"></div>
                <img className={classes.logo} alt="logo" src={logo} width="250px" />
                <Typography className={classes.text}>
                    函館山の麓にある19本の坂道をもっと楽しむための写真投稿・共有サービスです。みんなの投稿を見て、投稿してみて、それぞれの坂道の違いを知って、地元の方も、観光の方も、「遊びに行ってみたいな」と思っていただけたら嬉しいです。
                </Typography>
                <Typography className={classes.section}>ログインについて</Typography>
                <Typography className={classes.image}>
                    <InsertEmoticonIcon />
                </Typography>
                <Typography className={classes.text}>
                    基本的にはログインなしでご覧いただけます。投稿やコメント等のリアクションにはユーザー登録が必要となりますが、登録不要のゲストログイン機能もご用意しておりますので、ログインページよりお試しください。使い方がわかったら、ぜひユーザー登録してお楽しみください！
                </Typography>
                <div className="spacer-small"></div>
                <SharpEdgeButton
                    label={'ログイン ＞'}
                    onClick={() => {
                        dispatch(push('/login'));
                        props.toggleDialog(false);
                    }}
                />
                <Typography className={classes.section}>坂道を知る</Typography>
                <Typography className={classes.image}>
                    <SchoolIcon />
                </Typography>
                <Typography className={classes.text}>
                    同じように見える坂道でも、成り立ち、見どころ、違いはあるものです。それぞれの由来や場所、歴史について見てみましょう。それぞれの坂道に関するみんなの投稿写真もご覧いただけます。
                </Typography>
                <div className="spacer-small"></div>
                <SharpEdgeButton
                    label={'坂道を知る ＞'}
                    onClick={() => {
                        dispatch(push('/#categories'));
                        props.toggleDialog(false);
                    }}
                />
                <Typography className={classes.section}>投稿をみる</Typography>
                <Typography className={classes.image}>
                    <CameraEnhanceIcon />
                </Typography>
                <Typography className={classes.text}>
                    トップページにて、新着順、ランダム、坂道別、タグ別に投稿一覧をご覧いただけます。みんなの投稿を見て、実際に坂道に遊びに行ってみましょう！投稿をクリックすると、投稿詳細ページから写真にコメントもできます（ログインユーザーのみ）。函館好きの皆さんと交流してみましょう！
                </Typography>
                <div className="spacer-small"></div>
                <SharpEdgeButton
                    label={'みんなの投稿 ＞'}
                    onClick={() => {
                        dispatch(push('/#posts'));
                        props.toggleDialog(false);
                    }}
                />
                <Typography className={classes.section}>投稿する</Typography>
                <Typography className={classes.image}>
                    <CreateIcon />
                </Typography>
                <Typography className={classes.text}>
                    実際に遊びに行ったら、ぜひ自分の見つけた景色や発見を投稿してシェアしてみてください！スマートフォンからは直接写真を撮影してアップできます。写真には説明コメントの他に、任意のタグ付けも可能です。
                </Typography>
                <div className="spacer-small"></div>
                <SharpEdgeButton
                    label={'投稿する ＞'}
                    onClick={() => {
                        dispatch(push('/create'));
                        props.toggleDialog(false);
                    }}
                />
                <Typography className={classes.section}>「行きたい！」機能</Typography>
                <Typography className={classes.image}>
                    <FavoriteIcon />
                </Typography>
                <Typography className={classes.text}>
                    お気に入りの写真を見つけたら、ぜひ「行きたい！」（いいね）を付けましょう。「行きたい！」は投稿一覧や投稿詳細画面から付け外しできます。自分が「行きたい！」を付けた投稿はマイページに表示されるので、実際に遊びに行く時はマイページに貯めた写真を参考に楽しんでください！
                </Typography>
                <Typography className={classes.section}>マイページ機能</Typography>
                <Typography className={classes.image}>
                    <FaceIcon />
                </Typography>
                <Typography className={classes.text}>
                    マイページ（ログインユーザーのみ）では、ユーザー情報の変更の他に、自分の「行きたい！」投稿の一覧、自分が投稿した写真の編集や削除ができます。マイページからはアカウントの削除も可能です。
                </Typography>
                <div className="spacer-small"></div>
                <SharpEdgeButton
                    label={'マイページ ＞'}
                    onClick={() => {
                        dispatch(push('/mypage'));
                        props.toggleDialog(false);
                    }}
                />
                <Typography className={classes.section}>
                    使用した技術や意識した点はこちらにまとめておりますのでご覧くださいませ。
                </Typography>
                <Button
                    className={classes.button}
                    href="https://github.com/kazu-avi/hakodate-attractive-slopes"
                    target="_blank"
                >
                    GitHubへ　＞
                </Button>
                <Button className={classes.button} href="https://hakodate-slopes.com/portfolio" target="_blank">
                    Portfolioへ　＞
                </Button>
                <div className="spacer-medium"></div>
            </DialogContent>
        </Dialog>
    );
};

export default AboutDialog;
