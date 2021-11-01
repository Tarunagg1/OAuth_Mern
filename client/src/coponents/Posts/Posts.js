import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post'
import useStyle from './style';


export default function Posts({setupdateId}) {
    const classes = useStyle();
    const Posts = useSelector(state => state.posts.posts);
    return (
        !Posts.length ? <CircularProgress /> : (
            <Grid classes={classes.container} container alignItems="stretch" spacing={3}>
                {
                    Posts.map((post, key) => (
                        <Grid key={key} item xs={12} sm={6}>
                            <Post setupdateId={setupdateId} post={post} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
