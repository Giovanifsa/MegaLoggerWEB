import React from 'react';

class CommonStyles {
    public getMaxSizeStyling(mergeProperties? : React.CSSProperties) : React.CSSProperties {
        return this.mergeStyling(
                this.getMaxWidthStyling({
                    height: '100%',
                }
            ),
            mergeProperties
        );
    }

    public getMaxWidthStyling(mergeProperties? : React.CSSProperties) : React.CSSProperties {
        return this.mergeStyling({
                width: '100%'
            },
            mergeProperties
        );
    }

    private mergeStyling(style : React.CSSProperties, mergeProperties? : React.CSSProperties) : React.CSSProperties {
        if (mergeProperties) {
            return Object.assign(style, mergeProperties);
        }

        return style;
    }
}

export default new CommonStyles();