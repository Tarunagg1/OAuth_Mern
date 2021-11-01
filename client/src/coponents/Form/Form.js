
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './style';
import { createPost, updatePost } from '../../action/post.action';


export default function Form({ updateId, setupdateId }) {
    const classes = useStyles();
    const post = useSelector(state => updateId ? state.posts.posts.find((p) => p._id === updateId) : null);

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });


    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (updateId) {
            dispatch(updatePost(updateId, postData));
            clear();
        } else {
            dispatch(createPost(postData));
            clear();
        }
    }

    const changeInput = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }


    const clear = () => {
        setupdateId(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>

                <Typography variant="h6">{updateId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>

                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={changeInput} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={changeInput} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={changeInput} />

                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};
