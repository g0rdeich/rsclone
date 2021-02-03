async function updateUserOnServer(field, updateValue, token, path) {
	const localToken = localStorage.getItem(token);
	let statuts =false;
	let user = {};
	let statusCode = 401;
	let message= 'Отсутствует токен сессии';
	if (localToken){
	const requestOptions = {
		method: 'PUT',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token: localToken,
			field: field,
			updateValue: updateValue,
	})};

	const response = await fetch(path, requestOptions);
	const result = await response.json();

	statuts = result.status;
	user  = result.user;
	statusCode = response.status;
	message = response.status === 200 ? '' : result.message;

	}
	return  { statuts, user, statusCode, message}
};

async function logOut(token, currentUSer, path, setIsUserLogedCallback, setloggedUserCallback) {
	localStorage.removeItem(token);
	const requestOptions = {
		method: 'DELETE',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			login: currentUSer.login,
		})
	}

	const request = await fetch(path, requestOptions);
	const result = await request.json();

	if (result.status){
		setIsUserLogedCallback(false);
		setloggedUserCallback({});
	}
}

export {
	updateUserOnServer,
	logOut,
}