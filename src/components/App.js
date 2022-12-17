import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Banner from './Banner'
import RefuelForm from './RefuelForm';
import RefuelList from './RefuelList'
import Login from './Login'
import Register from './Register'
import { AuthProvider } from '../contexts/AuthContext';
import Profile from './Profile'
import UserDiv from './UserDiv'
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail'
import DeleteUser from './DeleteUser'
import theme_sheet from '../theme/themeSheet'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme(theme_sheet)

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Banner />
            <AuthProvider>
                <BrowserRouter basename='/~n3680/wuip'>
                    <Routes>
                        <Route path="/update_profile" element={<PrivateRoute><Profile /><UserDiv /></PrivateRoute>}></Route>
                        <Route path="/delete_user" element={<PrivateRoute><DeleteUser></DeleteUser><UserDiv /></PrivateRoute>}></Route>
                        <Route exact path="/" element={<Login />}></Route>
                        <Route path="/change_password" element={<PrivateRoute><ChangePassword /><UserDiv /></PrivateRoute>}></Route>
                        <Route path="/change_email" element={<PrivateRoute><ChangeEmail /><UserDiv /></PrivateRoute>}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/add_event" element={<PrivateRoute><RefuelForm /><UserDiv /></PrivateRoute>}></Route>
                        <Route path="/stats" element={<PrivateRoute><RefuelList /><UserDiv /></PrivateRoute>}></Route>
                        <Route path="/forgot_password" element={<ForgotPassword />}></Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
export default App;
