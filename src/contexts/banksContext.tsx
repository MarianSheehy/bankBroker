import React, { useState, useCallback } from "react";
import { BasebankProps, Review } from "../types/interfaces";


interface bankContextInterface {
    favourites: number[];
    addToFavourites: ((bank: BasebankProps) => void);
    removeFromFavourites: ((bank: BasebankProps) => void);
    addReview: ((bank: BasebankProps, review: Review) => void);
    addToPlaylist: ((bank: BasebankProps) => void);
    playlist: number[];
}
const initialContextState: bankContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (bank, review) => { bank.id, review},
    addToPlaylist: () => {},
    playlist: [],
};

export const banksContext = React.createContext<bankContextInterface>(initialContextState);

const banksContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [playlist, setPlaylist] = useState<number[]>([]);

    const addToFavourites = useCallback((bank: BasebankProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(bank.id)) {
                return [...prevFavourites, bank.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((bank: BasebankProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== bank.id));
    }, []);

    const addToPlaylist = (bank:BasebankProps) => {   // NEW
        setPlaylist( (prevPlaylist) => {
            if (!prevPlaylist.includes(bank.id)) {   
                const newPlaylist = [...prevPlaylist, bank.id];
                console.log("Updated Playlist:", newPlaylist);          
                return newPlaylist;
            }
            return prevPlaylist;
        });
    };      

    const addReview = (bank:BasebankProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [bank.id]: review } )
      };

    return (
        <banksContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                addToPlaylist,
                playlist,        
            }}
        >
            {children}
        </banksContext.Provider>
    );
};

export default banksContextProvider;
