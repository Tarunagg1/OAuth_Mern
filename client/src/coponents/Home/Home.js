import { Container, Grow, Grid } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPost } from '../../action/post.action';
import Navbar from '../navbar/Navbar';

export default function Home() {
    const [updateId, setupdateId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch])

    return (
        <Fragment>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item spacing={12} sm={7}>
                            <Posts setupdateId={setupdateId} />
                        </Grid>
                        <Grid item spacing={12} sm={4}>
                            <Form updateId={updateId} setupdateId={setupdateId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Fragment>
    )
}
