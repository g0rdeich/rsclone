// const serverPath = 'http://localhost:3005/'; //development server
const serverPath = 'https://rs-clone-thrvrce-demo.herokuapp.com/';// production server
// const Consts = {
	const loginPath = `${serverPath}login/authorize`;
	const registerPath = `${serverPath}login/register`;
	const checkSessionPath = `${serverPath}login/checkSession`;
	const logOutPath = `${serverPath}login/logout`
	const sessionToken = 'sessionToken';
// }
export {
	loginPath,
	registerPath,
	checkSessionPath,
	sessionToken,
	logOutPath
}