import React, { FC, useState } from 'react';
import { Styles } from './components/Styles';
import { ControlsView } from './ControlsView';
import { GameView } from './GameView';
import { MenuView } from './MenuView';

enum Route {
  Game = 'Game',
  Menu = 'Menu',
  Controls = 'Controls',
}

export const App: FC = () => {
  const [route, setRoute] = useState(Route.Menu);

  const handleMenu = () => setRoute(Route.Menu);
  const handleGame = () => setRoute(Route.Game);
  const handleControls = () => setRoute(Route.Controls);

  const navigate = () => {
    switch (route) {
      case Route.Game:
        return <GameView onQuit={handleMenu}></GameView>;
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
