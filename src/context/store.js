import React, { createContext, useReducer } from 'react';

const initialState = {
    allCharacters: [],
    pageCharacters: [],
    currentPage: 0,
    currentInfo: {},
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {

        let characters = [...state.pageCharacters];

        switch (action.type) {
            case 'SET_PAGE_CHARACTERS':
                characters[action.payload.page] = action.payload.data;
                return {
                    ...state,
                    currentPage: action.payload.page,
                    pageCharacters: characters,
                    currentInfo:  Object.keys(state.currentInfo).length === 0 ? {...action.payload.data.info} : {...state.currentInfo},
                    allCharacters: characters.flatMap( contentPage => contentPage )
                }
            case 'RESET_CHARACTERS':
                return {
                    ...state,
                    pageCharacters: [],
                    allCharacters: [],
                    currentInfo: {}
                }
            default:
                break;
        }
    }, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export { store, StateProvider };