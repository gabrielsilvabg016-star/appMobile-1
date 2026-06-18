import React, { createContext, useState } from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface PlayerContextType {//variaveis globais, tudo aqui dentro ta sendo exportado pra ser usado por outros objetos
  playerSkin: any;
  playerY: SharedValue<number>;//sharedValue e mais rapido que useState para jogos
  setPlayerSkin: React.Dispatch<React.SetStateAction<any>>;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [playerSkin, setPlayerSkin] = useState(
    require('./assets/doroRunning.gif')
  );

  const playerY = useSharedValue(270);

  return (
    <PlayerContext.Provider value={{
          playerSkin,
          setPlayerSkin,
          playerY
          }}
        >
      {children}
    </PlayerContext.Provider>
  );
};