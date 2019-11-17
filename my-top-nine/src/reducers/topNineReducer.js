// Top Nine actions
// any actions which alter global state should go through here
// any actions associated with an api call will have the three parts
// START, SUCCESS, and FAILURE, defined even if maybe they're not all used

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



// This is our 'contract' for maintaining state:
// 1. When logging out, the token 'MTN-token' should be removed
//    from local storage as well as updating state
// 2. When logging in, the reverse should be true
// 3. Any action that involves an api call should set
//    apiInProgress = true and apiMessage = '' before initiating the call
//    When the call returns set apiInProgress = false and update
//    apiMessage to an error message or other appropriate text
// 4. Any action which alters the top nine list should send
//    the entire updated list as payload


// what state should look like when we're logged out
export const initialState = {
	apiInProgress: false,
	apiMessage: '',
	apiAction: '',
	name: '',
	email: '',
	user_id: null,
	topNineList: []
};


// topNine reducer function
// Note that all the actions that update the top-nine list expect an entire list as payload
// This reducer does not change localStorage -- that should be done by the caller if necessary
export const topNineReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case REGISTER_SUCCESS:
			return {...state, apiInProgress: false, apiAction: '',
					apiMessage: 'Registration successful! You can log in now'};

		case REGISTER_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		case LOGOUT:
			return {...state, ...initialState};


		case LOGIN_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case LOGIN_SUCCESS:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: ''};

		case LOGIN_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		case LOAD_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case LOAD_SUCCESS:
			console.log('in reducer LOAD_SUCCESS');
			console.log(action.payload);

			return {...state, apiInProgress: false, apiAction: '', apiMessage: '',
					name: action.payload.name,
					email: action.payload.email,
					user_id: action.payload.id,
					topNineList: action.payload.topNine};

		case LOAD_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		case ADD_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case ADD_SUCCESS:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: '', topNineList: action.payload};

		case ADD_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		case DELETE_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case DELETE_SUCCESS:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: '', topNineList: action.payload};

		case DELETE_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		case EDIT_START:
			return {...state, apiInProgress: true, apiAction: action.type, apiMessage: ''};

		case EDIT_SUCCESS:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: '', topNineList: action.payload};

		case EDIT_FAILURE:
			return {...state, apiInProgress: false, apiAction: '', apiMessage: action.payload};


		default:
			return state;
	}
}
