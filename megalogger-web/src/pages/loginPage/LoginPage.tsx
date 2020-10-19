import React, { ChangeEvent } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { getLocaleDefinition } from "../../translations/Translator";
import Locale from '../../translations/locale/Locale';
import loginPageBG from './images/loginPageBG.jpg';
import transparentEmblemKvK from './images/transparentEmblemKvK.png';
import commonStyles from '../../styling/CommonStyles';
import contextManager from "../../servicing/ContextManager";

interface LoginPageProps {
    title: string;
};

interface LoginPageState {
    loginUsername: string;
    loginPassword: string;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
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

    private handleLoginButtonClick() : void {
        contextManager.login(this.state.loginUsername, this.state.loginPassword);
    }

    public render() : JSX.Element {
        let locale: Locale = getLocaleDefinition('PT_BR');

        return (
            <div
                style={
                    commonStyles.getMaxSizeStyling({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100%',
                        minWidth: '100%',
                        backgroundImage: "url(" + loginPageBG + ")",
                        backgroundSize: '100%'
                    })
                }
                >
                <Paper 
                    elevation={3}
                    style={{
                        width: '30%',
                        padding: '30px'
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
                        <img 
                            src={transparentEmblemKvK} 
                            alt="Teste"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />

                        <TextField 
                            id="outlined-basic" 
                            label={locale.loginUsername} 
                            variant="outlined"
                            value={this.state.loginUsername}
                            onChange={this.handleUsernameChange.bind(this)}
                        />

                        <TextField 
                            id="outlined-basic"
                            type="password" 
                            label={locale.loginPassword} 
                            variant="outlined"
                            value={this.state.loginPassword}
                            onChange={this.handlePasswordChange.bind(this)}
                        />

                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={this.handleLoginButtonClick.bind(this)}
                        >
                            {locale.loginButton}
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
};