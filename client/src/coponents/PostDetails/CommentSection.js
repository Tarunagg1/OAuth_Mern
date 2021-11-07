import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './style';
import { commentPost } from '../../action/post.action';


export default function CommentSection({ post }) {
    const { authdata } = useSelector(state => state.auth)
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const classes = useStyles();
    const commentsRef = useRef();


    const handleComment = async () => {
        const finalComment = `${authdata?.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComment('');
        setComments(newComments?.comments);
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {
                        comments?.length ? (comments?.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1">
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography>
                        ))
                        ) : (
                            <Typography gutterBottom variant="subtitle1">
                                <strong>No Comments!</strong>
                            </Typography>
                        )
                    }
                    <div ref={commentsRef} />
                </div>
                {
                    authdata && (
                        <div style={{ width: '70%' }}>
                            <Typography gutterBottom variant="h6">Write a comment</Typography>
                            <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                            <br />
                            <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
                                Comment
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
