import React from 'react';

import './Authorization.css'
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
	console.log(loggedUser);
	return(
		<React.Fragment>
        <li onClick={() => setIsOpen(true)} > {loggedUser.login} </li>

        {isOpen && (
          <div className='modal' onClick ={(e)=> closeModalHandler(e) } >
            <div className='modal-body'>
						<h1>{loggedUser}</h1>
              <p>{message}</p>
							<button id='LogOut' onClick={(e) => logOut()}>Выйти</button>
							<button id='Close' onClick={(e) => closeModalHandler(e)}>Отмена</button>
            </div>
          </div>
        )}
      </React.Fragment>
	)
}

export default UserWindow;

