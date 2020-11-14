import React from 'react';

let username = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).username
	: '';
let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).fullName
	: '';
let token = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).userToken
	: '';

export const initialState = {
	user: '' || user,
	username: '' || username,
	token: '' || token,
	loading: false,
	errorMessage: null,
	users: [],
	farms: [],
	farmers: [],
	facilities: [],
	roles: [],
	activities: [],
	tasks: []
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.username,
				user: action.payload.fullName,
				token: action.payload.userToken,
				loading: false,
			};
		
		case 'REQUEST_SETUP':
			return {
				...initialState,
				loading: true,
			};

		case 'SETUP_SUCCESS':
			return {
				...initialState,
				loading: false,
				users: action.payload.users,
				farms: action.payload.farms,
				farmers: action.payload.farmers,
				facilities: action.payload.facilities,
				roles: action.payload.roles,
				activities: action.payload.activities,
				tasks: action.payload.tasks
			};

		case 'SETUP_FAILURE':
			return {
				...initialState,
				loading: false,
				errorMessage: action.payload
			};

		case 'REQUEST_SIGNUP':
			return {
				...initialState,
				loading: true
			}
		case 'SIGNUP_SUCCESS':
			return {
				...initialState,
				loading: false
			}
		case 'SIGNUP_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
		
		case 'REQUEST_POST_FARMER':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_FARMER_SUCCESS':
			return {
				...initialState,
				loading: false,
				farmers: action.payload,
			};

		case 'POST_FARMER_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		case 'REQUEST_POST_FARM':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_FARM_SUCCESS':
			return {
				...initialState,
				loading: false,
				farms: action.payload,
			};

		case 'POST_FARM_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		case 'REQUEST_POST_FACILITY':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_FACILITY_SUCCESS':
			return {
				...initialState,
				loading: false,
				facilities: action.payload,
			};

		case 'POST_FACILITY_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		case 'REQUEST_POST_ACTIVITY':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_ACTIVITY_SUCCESS':
			return {
				...initialState,
				loading: false,
				activities: action.payload,
			};

		case 'POST_ACTIVITY_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		case 'REQUEST_POST_ROLE':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_ROLE_SUCCESS':
			return {
				...initialState,
				loading: false,
				roles: action.payload,
			};

		case 'POST_ROLE_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		case 'REQUEST_POST_TASK':
			return {
				...initialState,
				loading: true,
			};

		case 'POST_TASK_SUCCESS':
			return {
				...initialState,
				loading: false,
				tasks: action.payload,
			};

		case 'POST_TASK_FAILURE':
			return {
				...initialState,
				loading: false,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
