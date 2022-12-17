
import React from 'react'
import { Box, AppBar, Typography, Icon } from '@mui/material'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
function Banner() {
    return (
        <Box sx={{ flexGrow: 1, marginBottom: '5em' }}>
            <AppBar sx={{height: '5em'}}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: '1em', marginLeft: '1em' }}>
                <Icon><LocalGasStationIcon></LocalGasStationIcon></Icon>
                    Car consumption monitoring  
                </Typography>
                
            </AppBar>
        </Box>
    )
}
export default Banner;