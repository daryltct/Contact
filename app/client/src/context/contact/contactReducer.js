export default function contactReducer(state, action) {
	switch (action.type) {
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ ...state.contacts, action.payload ]
			};
		case 'DELETE_CONTACT':
			return {};
		case 'SET_CURRENT':
			return {};
		case 'UPDATE_CONTACT':
			return {};
		case 'FILTER_CONTACTS':
			return {};
		case 'CLEAR_FILTER':
			return {};
		default:
			return state;
	}
}
