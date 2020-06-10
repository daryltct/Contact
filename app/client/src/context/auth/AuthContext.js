import React, { useReducer, createContext } from 'react';
import authReducer from './authReducer';

const AuthContext = createContext();

const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isLoggedIn: false,
	loading: true,
	error: null
};

function AuthContextProvider(props) {
	const [ authState, dispatch ] = useReducer(authReducer, initialState);

	// Load User
	// Register User
	// Login
	// Logout
	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				token: authState.token,
				user: authState.user,
				isLoggedIn: authState.isLoggedIn,
				loading: authState.loading,
				error: authState.error
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContextProvider, AuthContext };
