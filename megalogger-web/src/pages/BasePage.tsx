import React from 'react';
import FixedSnackbar, { SnackbarController } from "../components/FixedSnackbar";
import commonStyles from "../styling/CommonStyles";
import { AppBar, Toolbar, IconButton, /*Typography, InputBase, Badge,*/ Menu, MenuItem } from "@material-ui/core";
// import SearchIcon from '@material-ui/icons/Search';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import contextManager from "../servicing/ContextManager";

interface BasePageProps {
    children: JSX.Element
    setBasePageController?(controller: BasePageController) : void;
}

interface BasePageState {
    accountMenuOpen: boolean;
    accountMenuPosAnchor?: HTMLElement,
    loggedIn: boolean
}

export interface BasePageController {
    snackbarController?: SnackbarController;

    setLoginState(loggedIn: boolean) : void;
}

export default class BasePage extends React.Component<BasePageProps, BasePageState> {
    private basePageController: BasePageController;

    constructor(props: BasePageProps) {
        super(props);

        this.basePageController = {
            setLoginState: this.setLoginState.bind(this)
        };

        if (this.props.setBasePageController) {
            this.props.setBasePageController(this.basePageController);
        }

        this.state = {
            accountMenuOpen: false,
            loggedIn: false
        };
    }

    private handleAccountButtonClick(event: React.MouseEvent<HTMLElement>) : void {
        this.setState({
            accountMenuOpen: true,
            accountMenuPosAnchor: event.currentTarget
        })
    }

    private handleAccountMenuClose() : void {
        this.setState({
            accountMenuOpen: false,
            accountMenuPosAnchor: undefined
        });
    }

    private handleAccountMenuSelection(index: number) : void {
        this.handleAccountMenuClose();
    }

    private setSnackbarController(controller: SnackbarController) : void {
        this.basePageController.snackbarController = controller;
    }

    private setLoginState(loggedIn: boolean) : void {
        this.setState({
            loggedIn
        });
    }

    public render() : JSX.Element {
        return (
            <div 
                style={commonStyles.getMaxSizeStyling()}
            >
                <FixedSnackbar 
                    setSnackbarController={this.setSnackbarController.bind(this)} 
                    snackbarTimeout={5000}
                />

                <AppBar position="static">
                    <Toolbar
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'left',
                            alignContent: 'left',
                            justifySelf: 'left'
                        }}
                    >

                        <IconButton
                            edge="end"
                            aria-label={contextManager.currentUser?.name}
                            aria-controls='primary-search-account-menu'
                            aria-haspopup="true"
                            onClick={this.handleAccountButtonClick.bind(this)}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>

                    </Toolbar>
                </AppBar>

                <Menu
                    anchorEl={this.state.accountMenuPosAnchor}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id='primary-search-account-menu'
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.accountMenuOpen}
                    onClose={this.handleAccountMenuClose.bind(this)}
                >
                    <MenuItem 
                        onClick={this.handleAccountMenuSelection.bind(this, 0)}
                    >
                        {contextManager.currentLocale.myAccount.getPhrase(contextManager.currentUser?.name)}
                    </MenuItem>

                    <MenuItem 
                        onClick={this.handleAccountMenuSelection.bind(this, 1)}
                    >
                        {contextManager.currentLocale.endSession.getPhrase(contextManager.currentUser?.name)}
                    </MenuItem>
                </Menu>

                {this.props.children}
            </div>
        );
    }
}