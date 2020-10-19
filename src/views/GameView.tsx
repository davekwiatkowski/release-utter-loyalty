import React, { FC } from 'react';
import { ViewComponent } from '../components/ViewComponent';
import { Game } from '../game/Game';
import { Styles } from '../Styles';

export interface IGameViewProps {
  onQuit: () => void;
}

export const GameView: FC<IGameViewProps> = (props) => {
  let game: Game;

  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }
    if (!game) game = new Game(canvas, props.onQuit);
  };

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
