import React, { Fragment, useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography, Avatar, Button } from '@material-ui/core';
import useStyle from './style';
import { LockOutlinedIcon } from '@material-ui/icons';
import Icon from './icon';
import Inputfield from './Inputfield';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { CLIENT_ID } from '../../config/Env';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../../constant';
import { useHistory } from 'react-router';
import { loginUser, registerUser } from '../../action/auth.action';

export default function Auth() {
    const classes = useStyle();
    const [showPassword, setshowPassword] = useState(false);
    const [isSignUp, setisSignUp] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { authdata } = useSelector(state => state.auth);

    const [formData, setformData] = useState({
        name:"",
        lastname:"",
        password:"",
        email:"",
        repeatpass:""
    })
    

    const handelSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            // register
            dispatch(registerUser({formData,history}));
        }else{
            // login
            dispatch(loginUser({formData,history}));
        }
    }

    useEffect(() => {
        if(authdata){
            history.push('/');
        }
    }, [authdata])

    const handelChange = (e) => {
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const handelShowPassword = () => {
        setshowPassword((showPassword) => !showPassword);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId
        try {
            dispatch({ type: AUTH, payload: { result, token } });
            history.push("/");
        } catch (error) {
            toast.success("Something went wrong Try Again");
        }
    }

    const googleFailure = () => {
        toast.success("Something went wrong Try Again");
    }

    const switchMode = () => {
        setisSignUp((isSignUp) => !isSignUp);
        // handelSubmit(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                    kinuin
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form onSubmit={handelSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <Fragment>
                                    <Inputfield type="text" name="name" label="Enter firstname" half={true} onChange={handelChange} autoFocus="autoFocus" />
                                    <Inputfield type="text" name="lastname" label="Enter lastname" half={true} onChange={handelChange} autoFocus="autoFocus" />
                                </Fragment>
                            )
                        }
                        <Inputfield type="email" name="email" label="Enter email" half={false} onChange={handelChange} autoFocus="autoFocus" />
                        <Inputfield type={showPassword ? "text" : "password"} name="password" handelShowPassword={handelShowPassword} label="Enter Password" onChange={handelChange} autoFocus="autoFocus" />
                        {
                            isSignUp && (
                                <Fragment>
                                    <Inputfield type="password" name="repeatpass" label="Repeat Password" onChange={handelChange} autoFocus="autoFocus" />
                                </Fragment>
                            )
                        }
                    </Grid>

                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin clientId={CLIENT_ID} render={(renderProps) => (
                        <Button className={classes.googleButton}
                            color="primary"
                            fullWidth onClick={renderProps.onClick}
                            disbled={renderProps.disbled}
                            startIcon={<Icon />} variant="contained" >Google SignIn</Button>
                    )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode} >
                                {isSignUp ? "Allready have an account Signin" : "Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}
