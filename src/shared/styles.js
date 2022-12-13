"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
var react_1 = require("@fluentui/react");
exports.styles = (0, react_1.mergeStyleSets)({
    nav: {
        overflowY: 'auto',
        fontSize: '14px'
    },
    pageContent: {
        margin: '0 auto',
        color: '#605e5c',
    },
    card: {
        boxShadow: react_1.Depths.depth8,
        background: '#ffffff'
    },
    contentBox: {
        borderColor: '#323130',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: '#fffffe',
        overflow: 'auto',
    },
    contentBoxCollapsed: {
        borderColor: '#323130',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: '#fffffe',
        borderBottomStyle: 'none',
    },
    callout: {
        width: 320,
        padding: '20px 24px',
    },
    calloutTitle: {
        marginBottom: 12,
        fontWeight: react_1.FontWeights.semilight,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    contentBoxButton: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#323130',
        borderBottomStyle: 'none',
        borderRadius: '5px',
        height: '40px'
    },
    codeText: {
        whiteSpace: 'pre-wrap',
        background: 'rgb(255, 255, 254)',
        color: 'rgb(50, 49, 48)'
    }
});
//# sourceMappingURL=Styles.js.map