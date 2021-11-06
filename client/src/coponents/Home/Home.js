import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import Form from '../Form/Form';
import Posts from '../Posts/PostsComp';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getPostBySearch } from '../../action/post.action';
import Paginations from '../Pagination/Paginations';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Home() {
    const [updateId, setupdateId] = useState(0);
    const dispatch = useDispatch();
    const { authdata } = useSelector(state => state.auth);
    const classes = useStyles();
    const history = useHistory();

    const query = useQuery();
    const page = query.get('page') || 1;

    const searchQuery = useQuery().get('searchQuery');

    const [SearchValue, setSearchValue] = useState('');

    const [tagSearchValue, settagSearchValue] = useState([])

    useEffect(() => {
        dispatch(getPost(page));
    }, [updateId, dispatch])

    const handelKeyPress = (e) => {
        if (e.keyCode === 13) {
            // search posts
            console.log('mi');
            searchPost();
        }
    }

    const handelTagAdd = (tag) => {
        settagSearchValue([...tagSearchValue, tag])
    }

    const handelTagDelete = (tagtoDelete) => {
        settagSearchValue(tagSearchValue.filter((tag) => tag !== tagtoDelete))
    }

    const searchPost = () => {
        if (SearchValue.trim()) {
            // dispatch request
            dispatch(getPostBySearch({ search: SearchValue, tags: tagSearchValue.join(",") }));
            history.push(`/posts/search?searchQuery=${SearchValue || 'none'}&tags=${tagSearchValue.join(",")}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Fragment>
            <Grow in>
                <Container maxWidth="xl" className={classes.gridContainer}>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item spacing={12} sm={authdata ? 9 : 12}>
                            <Posts page="1" setupdateId={setupdateId} />
                        </Grid>
                        {
                            authdata && (
                                <Grid item spacing={12} sm={3}>
                                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                        <TextField name="search" varient="outlined" value={SearchValue} onKeyPress={handelKeyPress} onChange={(e) => setSearchValue(e.target.value)} label="Search memories" fullWidth />

                                        <ChipInput
                                            style={{ margin: '10px 0' }}
                                            value={tagSearchValue}
                                            onAdd={handelTagAdd}
                                            onDelete={handelTagDelete}
                                            label="Search tags"
                                            variant="outlined"
                                        />

                                        <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
                                    </AppBar>

                                    <Form updateId={updateId} setupdateId={setupdateId} />
                                    {
                                        (!searchQuery && !tagSearchValue.length) && (
                                            <Paper className={classes.pagination} elevation={6}>
                                                <Paginations page={page} />
                                            </Paper>

                                        )
                                    }
                                </Grid>
                            )
                        }
                    </Grid>
                </Container>
            </Grow>
        </Fragment>
    )
}
