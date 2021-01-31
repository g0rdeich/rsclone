import React from 'react';
import Navbar from "./components/Navbar/navbar";
import GameField from './gamefield/GameField'
import Topics from "./topics/topics";
import hide from "./functions/hide";
import show from "./functions/show";
import changeHostText from "./functions/changeHostText";
import GlobalContext from './GlobalContext'
import  {sessionToken, checkSessionPath} from './components/Const'

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

		const request = await fetch(checkSessionPath, requestOptions);
		const result = await request.json();

		if (result.status){
		console.log('token found and valid')
		return result.user;

		} else {
		console.log('token not found or invalid')
		localStorage.removeItem(sessionToken);
		return '';
		}
	}
}

function App() {

	const [loggedUser, setloggedUser] = React.useState('');
	checLocalToken().then (res =>  setloggedUser(res));

	const [topics, setTopics] = React.useState(Topics)
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

	return (
    <GlobalContext.Provider value= {{ loggedUser, setloggedUser}} >
		<div className="wrapper">
      <Navbar />
			<GameField topics={topics} logger={logger}/>
    </div>
		</GlobalContext.Provider>
  );
}

export default App;
