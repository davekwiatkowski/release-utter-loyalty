import React, { FC } from 'react';
import Game from '../canvas/Game';
import { logDebug } from '../canvas/Logger';
import ViewComponent from '../components/ViewComponent';
import Styles from '../Styles';

export interface IGameViewProps {
  onQuit: () => void;
}

const GameView: FC<IGameViewProps> = (props) => {
  let game: Game;

  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }
    if (!game) game = new Game(canvas, props.onQuit);
  };

  logDebug('Rendering game');

  return (
    <ViewComponent>
      <canvas style={styles.canvas} ref={handleCanvasRef}></canvas>
    </ViewComponent>
  );
};

const styles: Styles = {
  canvas: {
    width: '100%',
    height: '100%',
  },
};

export default GameView;
