import React, { FC } from 'react';
import Game from '../canvas/Game';
import ViewComponent from '../components/ViewComponent';
import Styles from '../Styles';

export interface IGameViewProps {
  onPause: () => void;
}

const GameView: FC<IGameViewProps> = (props) => {
  let game: Game;

  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'Escape') {
      window.removeEventListener('keydown', handleEscapeKeyDown);
      game.pause();
      props.onPause();
    }
  };
  window.addEventListener('keydown', handleEscapeKeyDown);

  const handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }
    window.onresize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    };
    game = new Game(canvas);
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

export default GameView;
