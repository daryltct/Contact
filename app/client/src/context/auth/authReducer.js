export default function authReducer(state, action) {
	switch (action.type) {
		case 'REGISTER_SUCCESS':
			return {};
		case 'REGISTER_FAIL':
			return {};
		case 'LOGIN_SUCCESS':
			return {};
		case 'LOGIN_FAIL':
			return {};
		case 'USER_LOADED':
			return {};
		case 'AUTH_ERROR':
			return {};
		case 'LOGOUT':
			return {};
		case 'CLEAR_ERRORS':
			return {};
		default:
			return state;
	}
}
