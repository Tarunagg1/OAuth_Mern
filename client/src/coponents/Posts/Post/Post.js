import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';

import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './style';
import { deletePost, likePost } from '../../../action/post.action';


export default function Post({ post,setupdateId }) {
    const dispatch = useDispatch();

    const classes = useStyles();

    const deletePostInside = (id) => {
        dispatch(deletePost(id));
    }

    const editPostInside = (id) => {
        setupdateId(id);
    }

    const likePostInside = (id) => {
        dispatch(likePost(id));
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button onClick={() => editPostInside(post._id)} style={{ color: 'white' }} size="small"><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" onClick={() => likePostInside(post._id)} color="primary" ><ThumbUpAlt fontSize="small" /> Like {post.likecount} </Button>
                <Button size="small" onClick={() => deletePostInside(post._id)} color="primary"><DeleteIcon fontSize="small" /> Delete</Button>
            </CardActions>
        </Card>
    )
}
