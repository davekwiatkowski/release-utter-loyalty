import React, { FC } from 'react';
import ViewComponent from '../components/ViewComponent';

export interface IControlsViewProps {
  onMenu: () => void;
}

const ControlsView: FC<IControlsViewProps> = (props) => {
  return (
    <ViewComponent>
      <div>
        <h1>Controls</h1>
        <p>'Escape' to pause the game.</p>
      </div>
      <button onClick={props.onMenu}>Back to menu</button>
    </ViewComponent>
  );
};

export default ControlsView;
