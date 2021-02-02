import React from 'react';
import './Modals.css'
import UserInfo from './UserWindowComponents/UserInfo'
import  { sessionToken, logOutPath } from '../Const'
import Context from '../../GlobalContext'


const DEFAULT_MESSAGE = 'Личный кабинет'

function UserWindow() {
	const [isOpen, setIsOpen] = React.useState(false);
	const[message, setMessage] = React.useState(DEFAULT_MESSAGE);
	let {loggedUser ,setisUserLoged} = React.useContext(Context);


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
						<h1>{`${DEFAULT_MESSAGE}: ${loggedUser.login}`}</h1>
							<div className='user_contextWrapper'>
								<div className='user-menu'>
									<ul>
										<li>Пользователь</li>
										<li>Статистика</li>
										<li>Сохранения</li>
										<li>Выход</li>
									</ul>
								</div>
								<div className='user-menu-item'>
									<UserInfo/>
								</div>
							</div>
							<button id='LogOut' onClick={(e) => logOut()}>Выйти</button>
							<button id='Close' onClick={(e) => closeModalHandler(e)}>Закрыть меню</button>





							{/* <h1>{loggedUser}</h1>
              <p>{message}</p>
							<button id='LogOut' onClick={(e) => logOut()}>Выйти</button>
							<button id='Close' onClick={(e) => closeModalHandler(e)}>Отмена</button> */}
            </div>
          </div>
        )}
      </React.Fragment>
	)
}

export default UserWindow;

