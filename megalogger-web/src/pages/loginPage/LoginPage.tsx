import React, { ChangeEvent } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import loginPageBG from './images/loginPageBG.png';
import completeEmblem from './images/completeEmblem.png';
import commonStyles from '../../styling/CommonStyles';
import contextManager from "../../servicing/ContextManager";
import BasePage, { BasePageController } from "../BasePage";
import ArchitectureExceptionInformation from "../../resources/dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "../../resources/dto/UserAuthorizationDTO";
import ResourceCallButton from "../../components/ResourceCallButton";
import IActionCallback from "../../common/IActionCallback";

interface LoginPageProps {
    title: string;
};

interface LoginPageState {
    loginUsername: string;
    loginPassword: string;
    callingLoginResource: boolean
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    private basePageController?: BasePageController;

    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
            loginUsername: "",
            loginPassword: "",
            callingLoginResource: false
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
        this.setCallingLoginResourceState(false);
        this.basePageController?.setLoginState(true);

        this.basePageController?.snackbarController?.displayTopRightCornerSuccess(
            contextManager.currentLocale.loginSuccess.getPhrase(success.user.name)
        );
    }

    private handleLoginError(error: ArchitectureExceptionInformation) : void {
        this.setCallingLoginResourceState(false);
        this.basePageController?.setLoginState(false);

        this.basePageController?.snackbarController?.displayTopRightCornerError(error.message);
    }

    private handleLoginButtonClick(passCallback: IActionCallback<any, any>) : void {
        this.setCallingLoginResourceState(true);

        contextManager.login({
            userName: this.state.loginUsername,
            password: this.state.loginPassword,
            callback: passCallback
        });
    }

    private setCallingLoginResourceState(callingLoginResourceState: boolean) : void {
        this.setState({
            callingLoginResource: callingLoginResourceState
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
        return commonStyles.getMaxWidthStyling({
            backgroundColor: 'ButtonShadow'
        });
    }

    private getLoginButtonContainerStyle() : React.CSSProperties {
        return commonStyles.getMaxWidthStyling();
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
                                disabled={this.state.callingLoginResource}
                            />

                            <TextField 
                                type="password" 
                                label={contextManager.currentLocale.loginPassword.getPhrase()} 
                                variant="outlined"
                                value={this.state.loginPassword}
                                onChange={this.handlePasswordChange.bind(this)}
                                disabled={this.state.callingLoginResource}
                            />

                            <ResourceCallButton 
                                variant="contained" 
                                onClickCallResource={this.handleLoginButtonClick.bind(this)}
                                buttonStyle={this.getLoginButtonStyle()}
                                style={this.getLoginButtonContainerStyle()}
                                callback={{
                                    onSuccess: this.handleLoginSuccess.bind(this),
                                    onError: this.handleLoginError.bind(this)
                                }}
                            >
                                {contextManager.currentLocale.loginButton.getPhrase()}
                            </ResourceCallButton>
                        </form>
                    </Paper>
                </div>
            </BasePage>
        );
    }
};