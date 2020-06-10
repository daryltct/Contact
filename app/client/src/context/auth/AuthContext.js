import React, { useReducer, createContext } from 'react';
import axios from 'axios';
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
	async function register(formData) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({ type: 'REGISTER_SUCCESS', payload: res.data }); //res.data contains the token
		} catch (err) {
			dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
		}
	}
	// Login
	// Logout
	// Clear Errors
	function clearErrors() {
		dispatch({ type: 'CLEAR_ERRORS' });
	}

	return (
		<AuthContext.Provider
			value={{
				token: authState.token,
				user: authState.user,
				isLoggedIn: authState.isLoggedIn,
				loading: authState.loading,
				error: authState.error,
				register,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContextProvider, AuthContext };
