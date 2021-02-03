import React from 'react';
import './Modals.css'
import UserAvatar from './UserWindowComponents/userAvatar'
import  { sessionToken, logOutPath } from '../Const'
import Context from '../../GlobalContext'
import Statistic from './UserWindowComponents/Statistic'


const DEFAULT_MESSAGE = 'Личный кабинет'

function UserWindow() {
	function getStatistic(currentUser) {
		const totalAnswers = currentUser.rightAnswers + currentUser.wrongAnswers;

		function calcPercentOfAnswers(numbOfAnswers){
			return numbOfAnswers !== 0 &&  totalAnswers !== 0? +((numbOfAnswers / totalAnswers) * 100).toFixed(2) : 0;
		}

		const arrOfStatistic = [
			{name: 'Всего ответов', value: totalAnswers},
			{name: 'Верных ответов, кол-во', value: currentUser.rightAnswers},
			{name: 'Неверных ответов, кол-во', value: currentUser.wrongAnswers},
			{name: 'Верных ответов, %', value: calcPercentOfAnswers(currentUser.rightAnswers)},
			{name: 'Неверных ответов, %', value: calcPercentOfAnswers(currentUser.wrongAnswers)},
		]

		return arrOfStatistic;
	}

	const [isOpen, setIsOpen] = React.useState(false);
	let {loggedUser ,setisUserLoged} = React.useContext(Context);
	const [arrOfStats, setArrOfStats] = React.useState([])

	React.useEffect(() => {
		setArrOfStats(getStatistic(loggedUser));
	}, [loggedUser])

	const closeModalHandler = (e) => {
		if (e === undefined){
			setIsOpen(false);
		} else {
			(e.target === document.querySelector('.modal') && setIsOpen(false));
			(e.target === document.querySelector('#Close') && setIsOpen(false));
		}
	}

	async function logOut() {
		localStorage.removeItem(sessionToken);
		const requestOptions = {
			method: 'DELETE',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				login: loggedUser.login,
			})
		}

		const request = await fetch(logOutPath, requestOptions);
		const result = await request.json();

		if (result.status){
			setisUserLoged(false);
		}
	}

	return(
		<React.Fragment>
        <li onClick={() => setIsOpen(true)} > {loggedUser.login} </li>

        {isOpen && (
          <div className='modal' onClick ={(e)=> closeModalHandler(e) } >
            <div className='modal-body-user'>
							<div className='user-title'>
								<h2> {`${DEFAULT_MESSAGE}: ${loggedUser.login}`} </h2>
								<button id='Close' onClick={(e) => closeModalHandler(e)}>Вернуться к игре </button>
							</div>
							<div className='user-info'>
								<UserAvatar/>
								<div className='user-info-detail' >
									{arrOfStats.map((stat) => <Statistic statName={stat.name} statValue={stat.value} key={stat.name}/>)}
									{/* <button type='button' onClick={() => setArrOfStats(['побед', 'поражений', 'соотношение', 'test'])}> test stats</button> */}
								</div>
							</div>
							<button id='LogOut' onClick={(e) => logOut()}>Выйти из профиля</button>
            </div>
          </div>
        )}
      </React.Fragment>
	)
}

export default UserWindow;

