//  const serverPath = 'http://localhost:3005/'; //development server
const serverPath = 'https://rs-clone-thrvrce-demo.herokuapp.com/';// production server
// const Consts = {
	const loginPath = `${serverPath}login/authorize`;
	const registerPath = `${serverPath}login/register`;
	const checkSessionPath = `${serverPath}login/checkSession`;
	const logOutPath = `${serverPath}login/logout`;

	const updateUserPath = `${serverPath}login/updateUser`;

	const getAllTopicsPath = `${serverPath}topics/getalltopics`;
	const getTopicByNamePath = `${serverPath}topics/gettopicbyname`;
	const insertArrayOfTopicsPath = `${serverPath}topics/posttopics`;
	const deleteTopicByNamePath = `${serverPath}topics/deletetopicbyname`;


	const sessionToken = 'sessionToken';
	const checkSessionInterval = 1000 * 60 * 3;

// }
export {
	loginPath,
	registerPath,
	checkSessionPath,
	sessionToken,
	logOutPath,
	getAllTopicsPath,
	getTopicByNamePath,
	insertArrayOfTopicsPath,
	deleteTopicByNamePath,
	updateUserPath,
	checkSessionInterval,
}