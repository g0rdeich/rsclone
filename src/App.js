import React from 'react';
import Navbar from "./components/Navbar/navbar";
import GameField from './gamefield/GameField'
import Topics, { getRoundRandomTopics } from "./topics/topics";
import hide from "./functions/hide";
import show from "./functions/show";
import changeHostText from "./functions/changeHostText";
import GlobalContext from './GlobalContext'
import  {sessionToken, checkSessionPath} from './components/Const'

let loggedUser = null;

async function checLocalToken() {
	const localToken = localStorage.getItem(sessionToken);

	if (localToken){
		const requestOptions = {
			method: 'PUT',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: localToken,
			})
		};

		const response = await fetch(checkSessionPath, requestOptions);
		const result = await response.json();

		if (result.status){
			loggedUser = result.user;
			return true;
		} else {
		alert(result.message);
		localStorage.removeItem(sessionToken);
		loggedUser = null;
		return false;
		}
	}
	loggedUser = null;
	return false;
}

function App() {
	console.log('app init')
	const [isUserLoged, setisUserLoged] = React.useState(false);
	const [topics, setTopics] = React.useState(Topics)

	const [isActiveMenu, setisActiveMenu] = React.useState(false);

	React.useEffect(() =>{
		checLocalToken().then (res =>  setisUserLoged(res));
		getRoundRandomTopics().then(res => setTopics(res));
		console.log('useeffect')
	 }, []);

	function logger(a) {
		console.log(a);
		if(a.played === true) {
			console.log('already played');
			return;
		}
		const newHostText = `${a.topicName} ${a.price}`;
		const info = document.querySelector('.info');
		show(info);
		changeHostText(newHostText);
		setTopics(
			topics.map((topic) => {
				a.played = true;
				return topic;
			}))
		const table = document.querySelector('.questions-table');
		const questionText = document.querySelector('.question-text');
		hide(table);
		questionText.innerHTML = a.question;
		show(questionText);
		const currentQuestionPrice = a.price;
		localStorage.setItem('currentQuestionPrice', currentQuestionPrice);
		const currentQuestionRightAnswer = a.answers;
		localStorage.setItem('currentQuestionRightAnswer', currentQuestionRightAnswer);
	}
	console.log(loggedUser);
	return (
    <GlobalContext.Provider value= {{ isUserLoged, loggedUser, setisUserLoged, logger, topics, setTopics}} >
		<div className="wrapper">
      <Navbar />
			<GameField />
			</div>
		</GlobalContext.Provider>
  );
}

export default App;
