import React, {
    createContext,
    useContext,
    useReducer
} from 'react';

// -----------------------Redux Store Reducer---------------
// Create to reducer data state and actions
const Redux = {
    Reducer: (state, action) => {
        switch (action.type) {
            case 'MODAL_ACTION':
                return {
                    ...state,
                    modal: action.modal
                }
            default:
                return state;
        }
    },
    Store: () => {
        return [state, dispatch] = useReducer(Redux.Reducer, {
            modal: false
        });
    }
}
// -----------------------Context---------------
// Create to context for render state
const NewContext = createContext();
const RootProvider = ({ children }) => (
    <NewContext.Provider value={Redux.Store()}>
        {children}
    </NewContext.Provider>
);
// -----------------------Global State---------------
// Create to global state components
const useGlobal = () => useContext(NewContext);
// ---------------------------------------
export {
    RootProvider,
    useGlobal
}