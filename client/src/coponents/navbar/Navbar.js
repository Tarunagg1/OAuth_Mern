import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './style';
import { Link,useHistory,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileFromLocalStorage } from '../../reducers/auth.reducer';
import { LOG_OUT } from '../../constant';

export default function Navbar() {
    const {authdata} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setuser] = useState(getProfileFromLocalStorage());

    useEffect(() => {
        setuser(getProfileFromLocalStorage())
    }, [location])

    const logOut = ()=>{
        dispatch({type:LOG_OUT}) 
        history.push('/auth');
        setuser(null);
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
                        user? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}> {user?.name.charAt(0)} </Avatar>
                                <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
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
