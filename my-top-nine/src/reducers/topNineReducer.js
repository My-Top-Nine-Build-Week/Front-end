// Top Nine actions
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const LOAD_START = 'LOAD_START';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILURE = 'LOAD_FAILURE';

export const ADD_START = 'ADD_START';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';

export const DELETE_START = 'DELETE_START';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export const EDIT_START = 'EDIT_START';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';


export const blankUser = {
	name: '',
	email: '',
	user_id: null
};


export const loggedOutState = {
	apiInProgress: false,
	apiError: '',
	loggedIn: false,
	user: blankUser,
	topNineList: []
};


export const getInitialState = () => {

	// are we already logged in?
	const token = localStorage.getItem('MTN-token');
	const loggedIn = !(!token);
	let user = blankUser;

	if (loggedIn) {
		// get user info from local storage
		user = JSON.parse(localStorage.getItem('MTN-user'));
	}

	const initialState = {
		apiInProgress: false,
		apiError: '',
		loggedIn: loggedIn,
		user: user,
		topNineList: []
	};

	return initialState;
};


// topNine reducer function
// Note that all the actions that update the top-nine list expect an entire list as payload
export const topNineReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_START:
			return {...state, apiInProgress: true, apiError: ''};

		case REGISTER_SUCCESS:
			return {...state, apiInProgress: false, apiError: ''};

		case REGISTER_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload};


		case LOGOUT:
			return {...state, apiInProgress: false, apiError: '', loggedIn: false, user: blankUser, topNineList: []};


		case LOGIN_START:
			return {...state, apiInProgress: true, apiError: '', loggedIn: false, user: blankUser};

		case LOGIN_SUCCESS:
			return {...state, apiInProgress: false, apiError: '', loggedIn: true};

		case LOGIN_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload, loggedIn: false};


		case LOAD_START:
			return {...state, apiInProgress: true, apiError: ''};

		case LOAD_SUCCESS:
			return {...state, apiInProgress: false, apiError: '', topNineList: action.payload};

		case LOAD_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload};


		case ADD_START:
			return {...state, apiInProgress: true, apiError: ''};

		case ADD_SUCCESS:
			return {...state, apiInProgress: false, apiError: '', topNineList: action.payload};

		case ADD_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload};


		case DELETE_START:
			return {...state, apiInProgress: true, apiError: ''};

		case DELETE_SUCCESS:
			return {...state, apiInProgress: false, apiError: '', topNineList: action.payload};

		case DELETE_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload};


		case EDIT_START:
			return {...state, apiInProgress: true, apiError: ''};

		case EDIT_SUCCESS:
			return {...state, apiInProgress: false, apiError: '', topNineList: action.payload};

		case EDIT_FAILURE:
			return {...state, apiInProgress: false, apiError: action.payload};


		default:
			return state;
	}
}
