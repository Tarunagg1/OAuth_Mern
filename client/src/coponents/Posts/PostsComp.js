import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post'
import useStyle from './style';


export default function PostsComp({setupdateId}) {
    const classes = useStyle();
    const { posts } = useSelector(state => state.posts);
    const {loading} = useSelector(state => state.posts);
    
    if(posts){
        if(!posts.length && !loading){
            return <h1>No Post Found</h1>
        }
    }

    
    return (
        loading ?<CircularProgress /> : (
            <Grid classes={classes.container} container alignItems="stretch" spacing={2}>
                {
                    posts && posts.map((post, key) => (
                        <Grid key={key} item xs={12} sm={3}>
                            <Post setupdateId={setupdateId} post={post} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}
