import React from 'react';
import PropTypes from 'prop-types'
import './Authorization.css'
import  { sessionToken, logOutPath } from '../Const'
import Context from '../../GlobalContext'


const DEFAULT_MESSAGE = 'Личный кабинет'

function UserWindow() {
	const [isOpen, setIsOpen] = React.useState(false);
	const[message, setMessage] = React.useState(DEFAULT_MESSAGE);
	const {loggedUser ,setloggedUser} = React.useContext(Context);

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
				login: loggedUser,
			})
		}

		const request = await fetch(logOutPath, requestOptions);
		const result = await request.json();

		if (result.status){
			setloggedUser('');
		}
	}

	return(
		<React.Fragment>
        <li onClick={() => setIsOpen(true)} > {loggedUser} </li>

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

