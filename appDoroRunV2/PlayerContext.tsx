import React, { createContext, useState } from 'react';

//CONVERSÃO FEITA PELO GPT//
//Muita coisa pode ter quebrado devido a essa conversão//

interface PlayerContextType {
  playerSkin: any;
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

  return (
    <PlayerContext.Provider value={{ playerSkin, setPlayerSkin }}>
      {children}
    </PlayerContext.Provider>
  );
};