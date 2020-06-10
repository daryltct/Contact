import React, { useReducer, createContext } from 'react';
import alertReducer from './alertReducer';

const AlertContext = createContext();

const initialState = [];

function AlertContextProvider() {
	const [ alertState, dispatch ] = useReducer(alertReducer, initialState);

	// Set Alert

	return <AlertContext.Provider value={{}}>{props.children}</AlertContext.Provider>;
}

export { AlertContextProvider, AlertContext };
