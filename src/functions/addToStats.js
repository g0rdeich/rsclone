import  {sessionToken, updateUserPath} from '../components/Const'
import { updateUserOnServer } from './ServerFunctions'

function addToStats(answer, currentUser, setloggedUser) {
	updateUserOnServer(
		(answer ? 'rightAnswers': 'wrongAnswers'),
		(answer ? currentUser.rightAnswers : currentUser.wrongAnswers) + 1,
		sessionToken,
		updateUserPath)
		.then(({ statuts, user }) => {
			 if (statuts) {
					setloggedUser(user)
				} else {
					alert('Ошибка обновления на сервере. Не сохранена статистика ответа.');
				}
		});
}

export default addToStats;