import  {sessionToken, updateUserPath, logOutPath} from '../components/Const'
import { updateUserOnServer, logOut } from './ServerFunctions'


function addToStats(answer, currentUser, setloggedUser, setisUserLoged) {
	updateUserOnServer(
		(answer ? 'rightAnswers': 'wrongAnswers'),
		(answer ? currentUser.rightAnswers : currentUser.wrongAnswers) + 1,
		sessionToken,
		updateUserPath)
		.then(({ statuts, user, statusCode, message }) => {
			if (statusCode === 200) {
					setloggedUser(user)
				} else if(statusCode === 500){
					alert(message);
				} else {
					alert(`${message} Будет выполнен выход из профиля`);
					logOut(sessionToken, currentUser, logOutPath, setisUserLoged, setloggedUser)
				}
		});
}

export default addToStats;