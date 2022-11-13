import { TextField, Alert, Button, Avatar, Grid, Typography, Link, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import './login.css';
import { Login as LoginIcon } from '@mui/icons-material';
import React, { useState, FC } from 'react';
import { loginApi } from '../../service/user/user.service';
import { LoginInputs } from '../../service/user/user';
import { getValue } from '../utils/getValue';

const Login: FC = () => {
    const [showError, setShowError] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginInputs>();
    const onSubmit = async (data: LoginInputs) => {
        const result = await loginApi(data);
        if (getValue(result, 'data.status', 0) != 1) {
            setShowError(true);
        } else {
            location.href = '/';
        }
        reset();
    };
    const handleSignup = () => {};
    return (
        <Grid
            style={{ width: '600px', padding: '40px', margin: '150px auto' }}
            className="login-container"
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
        >
            <div>
                <Avatar style={{ margin: '0 auto' }}>
                    <LoginIcon style={{ color: '#37b9c5' }} />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ marginTop: '40px', textAlign: 'center' }}>
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="user_email"
                        label="username or email"
                        {...register('user_email', { required: true })}
                        style={{ marginTop: '50px' }}
                    />
                    {errors.user_email && <span style={{ color: 'red' }}>username or email is required</span>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="password"
                        {...register('password', { required: true })}
                        label="password"
                        type="password"
                        style={{ marginTop: '50px' }}
                    />
                    {errors.password && <span style={{ color: 'red' }}>password is required</span>}
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '50px', height: '40px' }}>
                        Sign In
                    </Button>
                    <Grid container style={{ marginTop: '30px' }}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {showError && <Alert severity="error">your username or password is error!</Alert>}
        </Grid>
    );
};

export default Login;
