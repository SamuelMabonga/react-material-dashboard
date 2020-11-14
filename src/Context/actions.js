const ROOT_URL = 'http://localhost:4000/api';
// http://localhost:4000/api
// 'https://edu-api-kia.herokuapp.com/api'

export async function loginUser(dispatch, loginPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(loginPayload),
	};

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
		let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
		let data = await response.json();

		console.log(response)

		if (data.username) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}

		let errorsArray = []

		data.map(error => {
			errorsArray.push(error.msg)
			return null
		})

		dispatch({ type: 'LOGIN_ERROR', error: errorsArray });
		return;
	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: error });
	}
}

export async function setup(dispatch, token) {
	const requestOptions = {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Accept': 'application/json', 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
	}

	try {
		dispatch({ type: 'REQUEST_SETUP' });
		let response = await fetch(`${ROOT_URL}/management/setup`, requestOptions)
		let data = await response.json()

		console.log(data)

		if (data.users) {
			dispatch({ type: 'SETUP_SUCCESS', payload: data })
			return true
		} else {
			dispatch({ type: 'SETUP_FAILURE', payload: data })
			return false
		}
	} catch (error) {
		dispatch({ type: 'SETUP_FAILURE', payload: error })
		return false
	}
}


export async function signupUser(dispatch, signupPayload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(signupPayload),
	};

	try {
		dispatch({ type: 'REQUEST_SIGNUP' });
		let response = await fetch(`${ROOT_URL}/auth/signup`, requestOptions);
		let data = await response.json();

		if (data.email) {
			dispatch({ type: 'SIGNUP_SUCCESS' });
			return data;
		}

		let errorsArray = []

		data.map(error => {
			errorsArray.push(error.msg)
			return null
		})

		dispatch({ type: 'SIGNUP_ERROR', error: errorsArray });
		return;
	} catch (error) {
		dispatch({ type: 'SIGNUP_ERROR', error: error });
	}
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('token');
}


export async function postFarmer(dispatch, farmerData, token) {
	const requestOptions = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Accept': 'application/json', 
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json' 
		},
		body: JSON.stringify(farmerData),
	}
	
	try {
		dispatch({ type: 'REQUEST_POST_FARMER' })
		let response = await fetch(`${ROOT_URL}/management/farmer`, requestOptions);
		let data = await response.json()

		console.log(data)

		if (data.questions[0].textone) {
			dispatch({ type: 'POST_FARMER_SUCCESS', payload: data.questions })
			return true
		}

		dispatch({ type: 'POST_FARMER_FAILURE', error: data })
	} catch (error) {
		dispatch({ type: 'POST_FARMER_FAILURE', error: error})
	}
}


export async function getAllQuestions(dispatch) {
	const requestOptions = {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
	}
	
	try {
		dispatch({ type: 'GET_ALL_QUESTIONS' })
		let response = await fetch(`${ROOT_URL}/questions`, requestOptions);
		let data = await response.json()

		if (data.questions[0].textone) {
			dispatch({ type: 'GET_ALL_QUESTIONS_SUCCESS', payload: data.questions })
			dispatch({ type: 'REQUEST_ANSWERS_SUCCESS', payload: data.answers })
			dispatch({ type: 'REQUEST_USERS_SUCCESS', payload: data.users })
			return null
		}

		dispatch({ type: 'GET_ALL_QUESTIONS_ERROR', error: data })
	} catch (error) {
		dispatch({ type: 'GET_ALL_QUESTIONS_ERROR', error: error})
	}
}

