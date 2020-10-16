import React, { ChangeEvent } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { getLocaleDefinition } from "../servicing/translations/Translator";
import Locale from '../servicing/translations/locale/Locale';

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

    public render() : JSX.Element {
        let locale: Locale = getLocaleDefinition('PT_BR');

        return (
            <Paper 
                elevation={3}
                style={{
                    marginTop: '40vh',
                    marginLeft: '30vw',
                    marginRight: '30vw',
                    textAlign: 'center',
                    paddingTop: '5vh',
                    paddingBottom: '5vh'
                }}
            >   
                <form noValidate autoComplete="off">
                    <div>
                        <TextField 
                            id="outlined-basic" 
                            label={locale.loginUsername} 
                            variant="outlined"
                            value={this.state.loginUsername}
                            onChange={this.handleUsernameChange.bind(this)}
                            style={{
                                width: '75%',
                                marginBottom: '10px'
                            }}
                        />
                    </div>

                    <div>
                        <TextField 
                            id="outlined-basic"
                            type="password" 
                            label={locale.loginPassword} 
                            variant="outlined"
                            value={this.state.loginPassword}
                            onChange={this.handlePasswordChange.bind(this)}
                            style={{
                                width: '75%',
                                marginBottom: '10px'
                            }}
                        />
                    </div>

                    <div>
                        <Button 
                            variant="contained" 
                            color="primary"
                            style={{
                                width: '75%'
                            }}
                        >
                            {locale.loginButton}
                        </Button>
                    </div>
                </form>
            </Paper>
        );
    }
};