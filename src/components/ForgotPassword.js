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
import { Link } from 'react-router-dom'
function ForgotPassword() {
    const [error, setError] = useState("")
    const[message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()
    async function handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(email)
            setMessage("Check your email")
        } catch {
            setError("Failed to reset password. User might not exist.")
        }
        setLoading(false)
    }
    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {message && <Alert severity="success">{message}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                      
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/" variant="body2">
                                    {"Login"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    )
}
export default ForgotPassword