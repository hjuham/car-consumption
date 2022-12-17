import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { Alert, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
function DeleteUser() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { deleteUser } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        navigate('/stats')
    };
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setError("")
            setLoading(true)
            await deleteUser()
            navigate('/')
        } catch {
            setError("Failed to delete user")
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
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Delete user?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete your profile? You will permanently lose all of your refueling events and profile information.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button sx={{color: 'red'}} disabled={loading} onClick={handleSubmit}>
                                Delete user
                            </Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>
            </Container>
    )
}
export default DeleteUser