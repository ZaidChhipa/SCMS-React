import React from 'react';
import { styled } from '@mui/material/styles';
import Sidenav from '../Sidenav';
import Box from '@mui/material/Box';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function About() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box sx={{ flexGrow: 1, paddingLeft: 3 }}>
                    <DrawerHeader />
                    <h1>About</h1>
                </Box>
            </Box>
        </>
    )
}

export default About;