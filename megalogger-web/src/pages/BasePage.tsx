import React from 'react';
import FixedSnackbar, { SnackbarControl } from "../components/FixedSnackbar";
import commonStyles from "../styling/CommonStyles";

interface BasePageProps {
    children: JSX.Element
    setSnackbarControl?(controller: SnackbarControl) : void;
}

export default class BasePage extends React.Component<BasePageProps> {
    public render() : JSX.Element {
        return (
            <div 
                style={commonStyles.getMaxSizeStyling()}
            >
                <FixedSnackbar 
                    setSnackbarControl={this.setSnackbarControl.bind(this)} 
                    snackbarTimeout={5000}
                />

                {this.props.children}
            </div>
        );
    }

    private setSnackbarControl(controller: SnackbarControl) : void {
        if (this.props.setSnackbarControl) {
            this.props.setSnackbarControl(controller);
        }
    }
}