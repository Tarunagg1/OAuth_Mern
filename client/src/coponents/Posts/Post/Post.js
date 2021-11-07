import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style';
import { deletePost, likePost } from '../../../action/post.action';
import { useHistory } from 'react-router';


export default function Post({ post, setupdateId }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { authdata } = useSelector(state => state.auth);
    const history = useHistory();
    const [likes, setlikes] = useState(post?.likes);

    const deletePostInside = (id) => {
        dispatch(deletePost(id));
    }

    const editPostInside = (id) => {
        setupdateId(id);
        console.log(id);
    }

    const likePostInside = (id) => {
        dispatch(likePost(id));
    }

    const likesTemplate = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (authdata?.googleId || authdata?._id)) ? (
                <> <ThumbUpAlt fontSize="small" />&nbsp; {post.likes.length > 2 ? ` You and ${post.likes.length - 1} others` : `${post.likes.length} Like${post.likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <> <ThumbUpAltOutlined fontSize="small" />&nbsp; {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" /> &nbsp; Like</>
    }

    const openPosts = (id) => {
        history.push(`/posts/${id}`);
    }

    return (
        <Card className={classes.card}>
            <CardMedia style={{ cursor: 'pointer' }} onClick={() => openPosts(post._id)} className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {
                    (authdata?.googleId === post.creatorid || authdata?._id === post.creatorid) && (
                        <Button onClick={() => editPostInside(post._id)} style={{ color: 'white' }} size="small"><MoreHorizIcon fontSize="default" /></Button>
                    )
                }
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!authdata} onClick={() => likePostInside(post._id)} >{likesTemplate()}</Button>
                {(authdata?.googleId === post?.creatorid || authdata?._id === post?.creatorid) && (
                    <Button size="small" onClick={() => deletePostInside(post._id)} color="primary"><DeleteIcon fontSize="small" /> Delete</Button>
                )}
            </CardActions>
        </Card>
    )
}
