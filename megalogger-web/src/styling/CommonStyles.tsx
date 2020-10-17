import React from 'react';

class CommonStyles {
    public getMaxSizeStyling(mergeProperties? : React.CSSProperties) : React.CSSProperties {
        return this.mergeStyling({
            height: '100%',
            width: '100%'
        }, mergeProperties);
    }

    private mergeStyling(style : React.CSSProperties, mergeProperties? : React.CSSProperties) : React.CSSProperties {
        if (mergeProperties) {
            return Object.assign(style, mergeProperties);
        }

        return style;
    }
}

export default new CommonStyles();