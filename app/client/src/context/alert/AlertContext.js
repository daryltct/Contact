import React, { useReducer, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import alertReducer from './alertReducer';

const AlertContext = createContext();

const initialState = [];

function AlertContextProvider(props) {
	const [ alertState, dispatch ] = useReducer(alertReducer, initialState);

	// Set Alert
	function setAlert(msg, type) {
		const id = uuidv4();
		dispatch({ type: 'SET_ALERT', payload: { msg, type, id } });

		//Remove alert after 5 seconds
		setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), 5000);
	}

	return <AlertContext.Provider value={{ alerts: alertState, setAlert }}>{props.children}</AlertContext.Provider>;
}

export { AlertContextProvider, AlertContext };
