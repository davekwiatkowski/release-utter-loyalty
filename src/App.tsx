import React, { FC, useState } from 'react';
import Styles from './Styles';
import ControlsView from './views/ControlsView';
import GameView from './views/GameView';
import MenuView from './views/MenuView';

enum Route {
  Game = 'Game',
  Menu = 'Menu',
  Controls = 'Controls',
}

const App: FC = () => {
  const [route, setRoute] = useState(Route.Menu);

  const handleMenu = () => setRoute(Route.Menu);
  const handleGame = () => setRoute(Route.Game);
  const handleControls = () => setRoute(Route.Controls);

  const navigate = () => {
    switch (route) {
      case Route.Game:
        return <GameView onPause={handleMenu}></GameView>;
      case Route.Menu:
        return (
          <MenuView
            onControls={handleControls}
            onStartGame={handleGame}></MenuView>
        );
      case Route.Controls:
        return <ControlsView onMenu={handleMenu}></ControlsView>;
    }
  };

  return <div style={styles.app}>{navigate()}</div>;
};

const styles: Styles = {
  app: {
    width: '100%',
    height: '100vh',
  },
};

export default App;
