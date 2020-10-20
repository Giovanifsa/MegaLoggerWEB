import React from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import Alert, { Color } from "@material-ui/lab/Alert";

interface FixedSnackbarProps {
    setSnackbarControl(controller: SnackbarControl): void;
    snackbarTimeout?: number;
};

interface FixedSnackbarState {
    anchorOrigin: SnackbarOrigin;
    open: boolean;
    message: string;
    severityColor: Color
};

export interface SnackbarControl {
    displaySnackbar(message: string, anchorOrigin: SnackbarOrigin, severityColor: Color) : void;
    displayTopRightCornerSuccess(message: string) : void;
    displayTopRightCornerError(message: string) : void;
};

export default class FixedSnackbar extends React.Component<FixedSnackbarProps, FixedSnackbarState> {
    constructor(props: FixedSnackbarProps) {
        super(props);

        this.state = {
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            open: false,
            message: "This should not be displayed",
            severityColor: "warning"
        };

        let controller: SnackbarControl = {
            displaySnackbar: this.displaySnackbar.bind(this),
            displayTopRightCornerSuccess: this.displayTopRightCornerSuccess.bind(this),
            displayTopRightCornerError: this.displayTopRightCornerError.bind(this)
        };

        props.setSnackbarControl(controller);
    }
    
    public render() : JSX.Element {
        return (
            <Snackbar
                anchorOrigin={this.state.anchorOrigin}
                open={this.state.open}
                onClose={this.handleSnackbarClose.bind(this)}
                key={this.state.anchorOrigin.horizontal + this.state.anchorOrigin.vertical}
                autoHideDuration={this.props.snackbarTimeout || 5000}
            >
                <Alert 
                    onChange={this.handleSnackbarClose.bind(this)}
                    severity={this.state.severityColor}
                >
                    {this.state.message}
                </Alert>
            </Snackbar>
        );
    }

    private handleSnackbarClose() {
        this.setState({
            open: false
        });
    }

    private displaySnackbar(message: string, anchorOrigin: SnackbarOrigin, severityColor: Color) : void {
        this.setState({
            message,
            anchorOrigin,
            severityColor,
            open: true
        });
    }

    private displayTopRightCornerSuccess(message: string) : void {
        this.displaySnackbar(message, {
            vertical: 'top',
            horizontal: "right"
        }, "success");
    }

    private displayTopRightCornerError(message: string) : void {
        this.displaySnackbar(message, {
            vertical: 'top',
            horizontal: "right"
        }, "error");
    }
};

