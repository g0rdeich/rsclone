const serverPath = 'http://localhost:3005/'
// const Consts = {
	const loginPath = `${serverPath}login/authorize`;
	const registerPath = `${serverPath}login/register`;
	const checkSessionPath = `${serverPath}login/checkSession`;
	const sessionToken = 'sessionToken';
// }
export {
	loginPath,
	registerPath,
	checkSessionPath,
	sessionToken
}