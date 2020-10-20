import React, { ChangeEvent } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { getLocaleDefinition } from "../../translations/Translator";
import Locale from '../../translations/locale/Locale';
import loginPageBG from './images/loginPageBG.png';
import transparentEmblemKvK from './images/transparentEmblemKvK.png';
import commonStyles from '../../styling/CommonStyles';
import contextManager from "../../servicing/ContextManager";
import BasePage from "../BasePage";
import { SnackbarControl } from "../../components/FixedSnackbar";
import ArchitectureExceptionInformation from "../../resources/dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "../../resources/dto/UserAuthorizationDTO";

interface LoginPageProps {
    title: string;
};

interface LoginPageState {
    loginUsername: string;
    loginPassword: string;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    private snackbarController?: SnackbarControl;
    private locale: Locale;

    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: ""
        };

        this.locale = getLocaleDefinition('PT_BR');
    }

    private handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            loginUsername: event.target.value
        });
    }

    private handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            loginPassword: event.target.value
        });
    }

    private handleLoginSuccess(success: UserAuthorizationDTO) : void {
        this.snackbarController?.displayTopRightCornerSuccess(this.locale.loginSuccess.getPhrase(success.user.name));
    }

    private handleLoginError(error: ArchitectureExceptionInformation) : void {
        this.snackbarController?.displayTopRightCornerError(error.message);
    }

    private handleLoginButtonClick() : void {
        contextManager.login({
            userName: this.state.loginUsername,
            password: this.state.loginPassword,
            callback: {
                onSuccess: this.handleLoginSuccess.bind(this),
                onError: this.handleLoginError.bind(this)
            }
        });
    }

    private setSnackbarControl(controller: SnackbarControl) : void {
        this.snackbarController = controller;
    }

    public render() : JSX.Element {
        return (
            <BasePage
                setSnackbarControl={this.setSnackbarControl.bind(this)}
            >
                <div
                    style={
                        commonStyles.getMaxSizeStyling({
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundImage: "url(" + loginPageBG + ")",
                            backgroundSize: '100%'
                        })
                    }
                >
                    <img 
                        src={transparentEmblemKvK} 
                        alt="Login emblem"
                        style={{
                            height: 'auto',
                            width: '20%'
                        }}
                    />

                    <Paper 
                        elevation={3}
                        style={{
                            width: '30%',
                            padding: '30px',
                            marginBottom: '15%',
                            backgroundColor: 'GrayText'
                        }}
                    >   
                        <form 
                            noValidate 
                            autoComplete="off"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignContent: 'center',
                                justifySelf: 'center',
                                gap: '10px'
                            }}
                        >

                            <TextField 
                                label={this.locale.loginUsername.getPhrase()} 
                                variant="outlined"
                                value={this.state.loginUsername}
                                onChange={this.handleUsernameChange.bind(this)}
                            />

                            <TextField 
                                type="password" 
                                label={this.locale.loginPassword.getPhrase()} 
                                variant="outlined"
                                value={this.state.loginPassword}
                                onChange={this.handlePasswordChange.bind(this)}
                            />

                            <Button 
                                variant="contained" 
                                onClick={this.handleLoginButtonClick.bind(this)}
                                style={{
                                    backgroundColor: 'ButtonShadow'
                                }}
                            >
                                {this.locale.loginButton.getPhrase()}
                            </Button>
                        </form>
                    </Paper>
                </div>
            </BasePage>
        );
    }
};