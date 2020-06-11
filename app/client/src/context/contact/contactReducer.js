export default function contactReducer(state, action) {
	switch (action.type) {
		case 'GET_CONTACTS':
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ ...state.contacts, action.payload ],
				loading: false
			};
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case 'SET_CURRENT':
			return {
				...state,
				current: action.payload
			};
		case 'UPDATE_CONTACT':
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case 'FILTER_CONTACTS':
			return {
				...state,
				filtered: action.payload
			};
		case 'CLEAR_FILTER':
			return {
				...state,
				filtered: null
			};
		case 'CLEAR_CONTACTS':
			return {
				contacts: null,
				current: null,
				filtered: null,
				error: null
			};
		case 'CONTACT_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
