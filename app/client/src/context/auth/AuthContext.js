import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

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
	async function loadUser() {
		//load token into global header
		setAuthToken(localStorage.token);

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: 'USER_LOADED', payload: res.data });
		} catch (err) {
			dispatch({ type: 'AUTH_ERROR' });
		}
	}
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
			loadUser();
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
				clearErrors,
				loadUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContextProvider, AuthContext };
