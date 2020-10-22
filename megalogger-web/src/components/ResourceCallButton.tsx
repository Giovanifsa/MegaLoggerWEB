import React from 'react';
import { Button, LinearProgress } from "@material-ui/core";
import IActionCallback from '../common/IActionCallback';

interface ResourceCallButtonProps {
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    variant?: 'text' | 'outlined' | 'contained';
    callback: IActionCallback<any, any>
    onClickCallResource(passCallback: IActionCallback<any, any>) : void;
    children: React.ReactNode;
};

interface ResourceCallButtonState {
    callingResource: boolean;
}

export default class ResourceCallButton extends React.Component<ResourceCallButtonProps, ResourceCallButtonState> {
    constructor(props: ResourceCallButtonProps) {
        super(props);

        this.state = {
            callingResource: false
        };
    }

    private handleButtonClick() : void {
        let preparedCallback: IActionCallback<any, any> = {
            onSuccess: this.handleCallbackSuccess.bind(this),
            onError: this.handleCallbackError.bind(this)
        };

        this.setCallingResourceState(true);

        this.props.onClickCallResource(preparedCallback);
    }

    private handleCallbackError(error: any) : void {
        this.setCallingResourceState(false);

        this.props.callback.onError(error);
    }

    private handleCallbackSuccess(success: any) : void {
        this.setCallingResourceState(false);

        this.props.callback.onSuccess(success);
    }

    private setCallingResourceState(calling: boolean) {
        this.setState({
            callingResource: calling
        });
    }

    private renderIfCallingResource() : React.CSSProperties {
        if (this.state.callingResource) {
            return {};
        }

        return {
            display: "none"
        }
    }

    public render() : JSX.Element {
        return (
            <div
                style={this.props.style}
            >
                <Button
                    variant={this.props.variant}
                    onClick={this.handleButtonClick.bind(this)}
                    style={this.props.buttonStyle}
                    disabled={this.state.callingResource}
                >
                    {this.props.children}
                </Button>

                <LinearProgress
                    style={this.renderIfCallingResource()}
                />
            </div>
        )
    }
};