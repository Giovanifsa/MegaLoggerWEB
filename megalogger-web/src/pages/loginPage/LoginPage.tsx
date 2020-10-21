import React, { ChangeEvent } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import loginPageBG from './images/loginPageBG.png';
import completeEmblem from './images/completeEmblem.png';
import commonStyles from '../../styling/CommonStyles';
import contextManager from "../../servicing/ContextManager";
import BasePage, { BasePageController } from "../BasePage";
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
    private basePageController?: BasePageController;

    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: ""
        };
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
        this.basePageController?.setLoginState(true);

        this.basePageController?.snackbarController?.displayTopRightCornerSuccess(
            contextManager.currentLocale.loginSuccess.getPhrase(success.user.name)
        );
    }

    private handleLoginError(error: ArchitectureExceptionInformation) : void {
        this.basePageController?.snackbarController?.displayTopRightCornerError(error.message);
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

    private setBasePageController(controller: BasePageController) : void {
        this.basePageController = controller;
    }

    private getMainDivStyle() : React.CSSProperties {
        return commonStyles.getMaxSizeStyling({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: "url(" + loginPageBG + ")",
            backgroundSize: '100%'
        });
    }

    private getEmblemStyle() : React.CSSProperties {
        return {
            height: 'auto',
            width: '20%'
        };
    }

    private getPaperStyle() : React.CSSProperties {
        return {
            width: '30%',
            padding: '30px',
            marginBottom: '13%',
            backgroundColor: 'GrayText'
        };
    }

    private getLoginFormStyle() : React.CSSProperties {
        return {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            justifySelf: 'center',
            gap: '10px'
        };
    }

    private getLoginButtonStyle() : React.CSSProperties {
        return {
            backgroundColor: 'ButtonShadow'
        };
    }

    public render() : JSX.Element {
        return (
            <BasePage
                setBasePageController={this.setBasePageController.bind(this)}
            >
                <div
                    style={this.getMainDivStyle()}
                >
                    <img 
                        src={completeEmblem} 
                        alt="Login emblem"
                        style={this.getEmblemStyle()}
                    />

                    <Paper 
                        elevation={3}
                        style={this.getPaperStyle()}
                    >   
                        <form 
                            noValidate 
                            autoComplete="off"
                            style={this.getLoginFormStyle()}
                        >
                            <TextField 
                                label={contextManager.currentLocale.loginUsername.getPhrase()} 
                                variant="outlined"
                                value={this.state.loginUsername}
                                onChange={this.handleUsernameChange.bind(this)}
                            />

                            <TextField 
                                type="password" 
                                label={contextManager.currentLocale.loginPassword.getPhrase()} 
                                variant="outlined"
                                value={this.state.loginPassword}
                                onChange={this.handlePasswordChange.bind(this)}
                            />

                            <Button 
                                variant="contained" 
                                onClick={this.handleLoginButtonClick.bind(this)}
                                style={this.getLoginButtonStyle()}
                            >
                                {contextManager.currentLocale.loginButton.getPhrase()}
                            </Button>
                        </form>
                    </Paper>
                </div>
            </BasePage>
        );
    }
};