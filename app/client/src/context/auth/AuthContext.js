import React, { useEffect, useReducer, createContext, useContext } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

const AuthContext = createContext();

//****************** CUSTOM HOOK TO USE CONTACT CONTEXT ******************
export function useAuth() {
	const { authState, authDispatch } = useContext(AuthContext);
	return [ authState, authDispatch ];
}

//********************* ACTION CREATORS *********************
//Config header used for register, login
const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

// Load User
export async function loadUser(dispatch) {
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
export async function register(dispatch, formData) {
	try {
		const res = await axios.post('/api/users', formData, config);

		dispatch({ type: 'REGISTER_SUCCESS', payload: res.data }); //res.data contains the token
		loadUser(dispatch);
	} catch (err) {
		dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.msg });
	}
}
// Login
export async function login(dispatch, formData) {
	try {
		const res = await axios.post('/api/auth', formData, config);
		dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
		loadUser(dispatch);
	} catch (err) {
		dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
	}
}
// Logout
export function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
}
// Clear Errors
export function clearErrors(dispatch) {
	dispatch({ type: 'CLEAR_ERRORS' });
}

//********************* CONTEXT PROVIDER *********************

const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isLoggedIn: false,
	loading: true,
	error: null
};

function AuthContextProvider(props) {
	const [ authState, authDispatch ] = useReducer(authReducer, initialState);

	// set token on initial app loading
	setAuthToken(authState.token);

	// load user on first run or refresh
	if (authState.loading) {
		loadUser(authDispatch);
	}

	// 'watch' state.token and set headers and local storage on any change
	useEffect(
		() => {
			setAuthToken(authState.token);
		},
		[ authState.token ]
	);

	return <AuthContext.Provider value={{ authState, authDispatch }}>{props.children}</AuthContext.Provider>;
}

export default AuthContextProvider;
