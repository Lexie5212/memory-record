import React,{ useState, useEffect } from 'react';
import { Button, Paper, Typography, Avatar, Grid, Container } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import { GoogleLogin } from '@react-oauth/google';
import { signin, signup} from '../../actions/auth';
import axios from 'axios'; 
import { ERROR } from '../../constants/actionTypes';
import { CLIENT } from '../../constants/errorTypes';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    const [formData, setFormData]= useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [renderGoogleSignIn, setRenderGoogleSignIn] = useState(false);
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        setRenderGoogleSignIn(true);
    }, []); // Run only once on mount


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
          } else {
            dispatch(signin(formData, navigate));
          }
    };
    const handleChange = (e) => {
        if (error) {
            dispatch({ type: ERROR, payload: '' }); // Clear error
        }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const switchMode = () => {
        dispatch({ type: ERROR, payload: '' });
        setIsSignup((prevIsSignup) => !prevIsSignup );
        setShowPassword(false);
    };
    
    const googleSuccess = async(res) => {
        console.log('res',res);
    
        const token = res?.credential;
        try {
            const result = await axios.post('http://localhost:4000/user/googleSignIn', { token });
            dispatch({ type: 'AUTH', data: result.data });

            navigate('/');         
        } catch (error) {
            console.log(error);

            const errorCode = error.response?.data?.error || CLIENT.NETWORK_ERROR;
            dispatch({ type: ERROR, payload: errorCode });
        }       
    };
    const googleFailure = () => {
        console.log("google login in fail");
        dispatch({ type: ERROR, payload: CLIENT.GOOGLE_AUTH_FAILED });
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !(prevShowPassword) );
   
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
        {error && <Typography className={classes.error}>{error}</Typography>}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5">Sign In</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" lable="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" lable="Email Address" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                {renderGoogleSignIn && (
                <GoogleLogin 
                    render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained">Google Sign In</Button>
                    )} 
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    cookiePolicy="single_host_origin"
                />)}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;