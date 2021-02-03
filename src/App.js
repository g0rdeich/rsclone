import React from 'react';
import Navbar from "./components/Navbar/navbar";
import GameField from './gamefield/GameField'
import Topics, { getRoundRandomTopics } from "./topics/topics";
import hide from "./functions/hide";
import show from "./functions/show";
import changeHostText from "./functions/changeHostText";
import GlobalContext from './GlobalContext'
import  {sessionToken, checkSessionPath, checkSessionInterval} from './components/Const';
import ButtonsBlocked from "./gamefield/players/buttons/buttonsBlocked";
import Footer from "./components/Footer";
import nullifyItems from "./functions/nullifyItems";

function App() {

	const [isUserLoged, setisUserLoged] = React.useState(false);
	const [topics, setTopics] = React.useState(Topics)
	let [loggedUser, setloggedUser] = React.useState({});

	const [tour, setTour] = React.useState(1);
	const [btns, setBtns] = React.useState(ButtonsBlocked);


	React.useEffect(() =>{
		nullifyItems();
		checLocalToken().then (res =>  setisUserLoged(res));
		getRoundRandomTopics().then(res => setTopics(res));
		setInterval(() => {
			checLocalToken().then (res =>  setisUserLoged(res));
		}, checkSessionInterval);
	 }, []);

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
				setloggedUser(result.user);
				return true;
			} else {
			alert(result.message);
			localStorage.removeItem(sessionToken);
			setloggedUser({});
			return false;
			}
		}
		setloggedUser({});
		return false;
	}

	function handler(a) {
		if(a.played === true) {
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
		const currentQuestionText = a.question;
		questionText.innerHTML = currentQuestionText;
		localStorage.setItem('currentQuestionText', currentQuestionText);
		show(questionText);
		const currentQuestionPrice = a.price;
		localStorage.setItem('currentQuestionPrice', currentQuestionPrice);
		const currentQuestionRightAnswer = a.answers;
		localStorage.setItem('currentQuestionRightAnswer', currentQuestionRightAnswer);
		setBtns(
			btns.map((btn) => {
				btn.isBlocked = !btn.isBlocked;
				return btn;
			})
		)
	}

	return (

    <GlobalContext.Provider value= {{ isUserLoged, loggedUser,setloggedUser, setisUserLoged, handler, topics,
		setTopics, btns, setBtns, tour, setTour}} >

		<div className="wrapper">
      <Navbar />
			<GameField />
			<Footer/>
			</div>
		</GlobalContext.Provider>
  );
}

export default App;
