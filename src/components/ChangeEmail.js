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


function ChangeEmail() {
    const { changeEmail, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let confirm_email = data.get('confirm-email')
        if (email !== confirm_email) {
            return setError("Emails don't match!")
        }
        try {
            setError('')
            setLoading(true)
            await changeEmail(email)
            navigate('/stats')
            
        } catch {
            setError('Failed to change email. Try logging in again.')
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
                        Change email
                    </Typography>
                    <Typography>
                        Your email is currently: {currentUser.email}
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="email"
                                    id="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm-email"
                                    label="Confirm Email"
                                    type="email"
                                    id="confirm-email"
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
                            Change email
                        </Button>
                    </Box>
                </Box>
            </Container>
    );
}
export default ChangeEmail;