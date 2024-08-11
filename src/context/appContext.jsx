import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [myList, setMyList] = useState([]);
    const [likedList, setLikedList] = useState([]);
    const [isDisplayFavorites, setIsDisplayFavorites] = useState(false);

    const data = {
        myList, 
        setMyList,
        likedList, 
        setLikedList,
        isDisplayFavorites, 
        setIsDisplayFavorites
    };

    return (
        <AppContext.Provider value={data}>
        {children}
        </AppContext.Provider>
    );
}