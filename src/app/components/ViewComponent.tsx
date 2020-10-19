import { Styles } from './Styles';
import React, { CSSProperties, FC } from 'react';

export interface IViewProps {
  style?: CSSProperties;
}

export const ViewComponent: FC<IViewProps> = (props) => {
  return <div style={{ ...props.style, ...styles.view }}>{props.children}</div>;
};

const styles: Styles = {
  view: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
  },
};
