import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './style';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../../constant';

export default function Navbar() {
    const { authdata } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();



    const logOut = () => {
        dispatch({ type: LOG_OUT })
        history.push('/auth');
    }

    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography className={classes.heading} to="/" component={Link} variant="h2" align="center">Keep Memories</Typography>
                    <img className={classes.img} height="60" src="https://p1.pxfuel.com/preview/793/513/260/table-book-notebook-hands-reading-memories.jpg" alt="" srcSet="" />
                </div>
                <Toolbar>
                    {
                        authdata ? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={authdata?.name} src={authdata?.imageUrl}> {authdata && authdata?.name?.charAt(0)} </Avatar>
                                <Typography className={classes.userName} variant="h6">{authdata && authdata?.name}</Typography>
                                <Button variant="contained" color="secondary" className={classes.logout} onClick={logOut}>Logout</Button>
                            </div>
                        ) : (
                            <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button>
                        )
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}
