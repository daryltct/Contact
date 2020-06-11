import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
	const { isLoggedIn, loading } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) => (!isLoggedIn && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
		/>
	);
}

export default PrivateRoute;
