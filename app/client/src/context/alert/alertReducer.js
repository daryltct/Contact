export default function alertReducer(state, action) {
	switch (action.type) {
		case 'SET_ALERT':
			return {};
		case 'REMOVE_ALERT':
			return {};
		default:
			return state;
	}
}
