import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { Alert } from '@mui/material';
function Profile() {
    const { updateProfile, currentUser } = useAuth()
    const [username, setUsername] = useState(currentUser.displayName || "Insert username here")
    const [url, setUrl] = useState(currentUser.photoURL || "Insert image URL here")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setError("")
            setLoading(true)
            await updateProfile(username, url)
            navigate('/stats')
        } catch {
            setError("Failed to update profile")
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
                        marginRight: '20%'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update profile
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography>Username:</Typography>
                    <TextField
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            margin="normal"
                            fullWidth
                            name="username"
                            type="text"
                            id="username"
                        />
                        <Typography>Image URL (jpeg, jpg or png):</Typography>
                        <TextField
                            value={url}
                            onChange={event => setUrl(event.target.value)}
                            margin="normal"
                            fullWidth
                            id="image"
                            name="image"
                        />
                        <Typography>None of these fields are mandatory</Typography>
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                       
                    </Box>
                </Box>
            </Container>
    )
}
export default Profile