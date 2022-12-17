import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
const drawerWidth = '20%';

export default function UserDiv() {
    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);
    const updateMedia = () => {
        setDesktop(window.innerWidth > 800);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
      });
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    async function handleLogout(){
        setError('')
        try{
            await logout()
            navigate('/')
        }catch{
            setError('Failed to log out')
        }
    }

    return (
        <Box sx={{ display: 'flex', zIndex: '-1' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Divider />
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to={'/update_profile'}>
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            {isDesktop ? (<><ListItemText sx={{width:"100%"}}>{currentUser.displayName}</ListItemText><br></br>
                            <img alt="profile" style={{width:"100%"}} src={currentUser.photoURL || "https://cdn.pixabay.com/photo/2017/08/06/11/09/isolated-2591372_960_720.png"}/></>):(<ListItemText></ListItemText>)}
                            
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to={'/add_event'}>
                        {isDesktop ? (<ListItemText>Add a refueling event</ListItemText>) : (<ListItemText>Add</ListItemText>)}
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to={'/stats'}>
                        {isDesktop ? (<ListItemText>Show stats</ListItemText>) : (<ListItemText>Stats</ListItemText>)}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to={'/change_email'}>
                            <ListItemIcon><ChangeCircleIcon></ChangeCircleIcon></ListItemIcon>
                            {isDesktop ? (<ListItemText>Change email</ListItemText>) : (<ListItemText></ListItemText>)}
                            
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to={'/change_password'}>
                            <ListItemIcon><LockResetIcon></LockResetIcon></ListItemIcon>
                            {isDesktop ? (<ListItemText>Change password</ListItemText>):(<ListItemText></ListItemText>)}
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to={'/delete_user'}>
                            <ListItemIcon><ClearIcon></ClearIcon></ListItemIcon>
                            {isDesktop ? (<ListItemText>Delete user</ListItemText>):(<ListItemText></ListItemText>)}
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon></LogoutIcon></ListItemIcon>
                            {isDesktop ? (<ListItemText>Logout</ListItemText>):(<ListItemText></ListItemText>)}
                            <ListItemText>{error && <Alert severity="error">{error}</Alert>}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
            </Box>
        </Box>
    );
}