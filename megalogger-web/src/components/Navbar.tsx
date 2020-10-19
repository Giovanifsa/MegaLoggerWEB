import React from 'react';
import { AppBar, IconButton, Typography } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons';

export default class Navbar extends React.Component {
    public render() : JSX.Element {
        return (
            <AppBar
                position="static"
            >
                <IconButton
                    edge="start"
                    aria-label="Extras"
                >
                </IconButton>

                <Typography variant="h6" noWrap>
                    Material-UI
                </Typography>
            </AppBar>
        );
    }
}