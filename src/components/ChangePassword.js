import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const { changePassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let password = data.get('password')
        let confirm_password = data.get('confirm-password')
        if (password !== confirm_password) {
            return setError("Passwords don't match!")
        }
        try {
            setError('')
            setLoading(true)
            await changePassword(password)
            navigate('/stats')
            
        } catch(error) {
            console.log(error)
            setError('Failed to change password. Try logging in again.')
        }
        setLoading(false)
    };

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: '20%'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change password
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change password
                        </Button>
                    </Box>
                </Box>
            </Container>
    );
}
export default ChangePassword;