import React, { FC } from 'react';
import { ViewComponent } from '../components/ViewComponent';

export interface IMenuViewProps {
  onStartGame: () => void;
  onControls: () => void;
}

export const MenuView: FC<IMenuViewProps> = (props) => {
  return (
    <ViewComponent>
      <h1>Release utter loyalty</h1>
      <div /* TODO: make this a button list component. */>
        <button onClick={props.onStartGame}>Start game</button>
        <button onClick={props.onControls}>Controls</button>
      </div>
    </ViewComponent>
  );
};
