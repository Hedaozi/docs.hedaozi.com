import {
  mergeStyleSets,
} from '@fluentui/react';

export const styles = mergeStyleSets({
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
  },
});
