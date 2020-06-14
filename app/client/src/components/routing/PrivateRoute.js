import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import Spinner from '../../components/layout/Spinner';

function PrivateRoute({ component: Component, ...rest }) {
	const [ authState ] = useAuth();
	const { isLoggedIn, loading } = authState;

	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? <Spinner /> : isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />}
		/>
	);
}

export default PrivateRoute;
