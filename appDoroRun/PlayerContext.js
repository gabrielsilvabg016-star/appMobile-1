import React, {Children, createContext, useState} from "react";

export const PlayerContext = createContext();

//Não entendi como isso funciona direito, mas funciona 

export const PlayerProvider = ({children}) => {
    const [playerSkin, setPlayerSkin] = useState(require('./assets/doroRunning.gif'));

    return(
        <PlayerContext.Provider value={{playerSkin, setPlayerSkin}}>
            {children}
        </PlayerContext.Provider>
    );
};