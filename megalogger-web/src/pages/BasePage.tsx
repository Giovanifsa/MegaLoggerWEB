import React from 'react';
import FixedSnackbar, { SnackbarController } from "../components/FixedSnackbar";
import commonStyles from "../styling/CommonStyles";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
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

    private getAppBarStyle() : React.CSSProperties {
        return {
            display: 'flex',
            flexDirection: 'row',
        };
    }

    private getLeftSideAppBarComponentsStyle() : React.CSSProperties {
        return {
            flexGrow: 1
        };
    }

    private renderIfLoggedIn() : React.CSSProperties {
        if (this.state.loggedIn) {
            return {};
        }

        return {
            display: "none"
        }
    }

    public render() : JSX.Element {
        return (
            <div 
                style={commonStyles.getMaxSizeStyling()}
            >
                <FixedSnackbar 
                    setSnackbarController={this.setSnackbarController.bind(this)} 
                    snackbarTimeout={5000}
                    marginTopPercentage={2.5}
                />

                <AppBar position="static">
                    <Toolbar
                        style={this.getAppBarStyle()}
                    >
                        <div 
                            style={this.getLeftSideAppBarComponentsStyle()}
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
                        </div>

                        <IconButton
                            edge="end"
                            aria-label={contextManager.currentUser?.name}
                            aria-controls='primary-search-account-menu'
                            aria-haspopup="true"
                            onClick={this.handleAccountButtonClick.bind(this)}
                            color="inherit"
                            style={this.renderIfLoggedIn()}
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