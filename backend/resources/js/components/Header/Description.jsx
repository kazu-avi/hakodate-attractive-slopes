import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 800,
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#f2f4fb',
    },
    text: {
        fontSize: 10,
        lineHeight: '2em',
    },
});

const Description = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.text}>
                <Typography className={classes.text}>
                    函館山の麓にある19本の坂道をもっと楽しむための写真投稿・共有サービスです。
                </Typography>
                <Typography className={classes.text}>
                    『綺麗な景色』『細かな発見』『季節の移ろい』『私のおすすめ』
                </Typography>
                <Typography className={classes.text}>
                    お住まいの方も、観光で来た方も、それぞれの坂の魅力を、楽しみ方を、皆さんでシェアしませんか？
                </Typography>
                <Typography className={classes.text}>函館の街がもっと盛り上がることを願って。</Typography>
                <Typography className={classes.text}>
                    投稿、コメント、いいね（行きたい）機能にはユーザー登録が必要ですが、ログインページにて登録不要のゲストログイン機能もご用意しております。
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Description;
