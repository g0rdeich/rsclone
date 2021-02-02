async function updateUserOnServer(field, updateValue, token, path) {
	const localToken = localStorage.getItem(token);
	let statuts =false;
	let user = {};
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

	}
	return  { statuts, user}
};

export {
	updateUserOnServer,
}