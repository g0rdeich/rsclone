import React from 'react';
import PropTypes from 'prop-types'
import './Modals.css'
import  {registerPath, loginPath, sessionToken} from '../Const'
import Context from '../../GlobalContext'

const DEFAULT_MESSAGE = 'Заполните форму';

function Autorization(props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const {windowName, isRegisterWnindow} = props;
	const[message, setMessage] = React.useState(DEFAULT_MESSAGE);
	let {setisUserLoged, loggedUser, setloggedUser} = React.useContext(Context);

	React.useEffect(() => {
		setMessage(DEFAULT_MESSAGE);
	}, [isOpen]);

	function saveToken (token) {
		if (localStorage.getItem(sessionToken)){
			localStorage.removeItem(sessionToken)
		}

		localStorage.setItem(sessionToken, token)
	}

	const closeModalHandler = (e) => {
		if (e === undefined){
			setIsOpen(false);
		} else {
			(e.target === document.querySelector('.modal') && setIsOpen(false));
			(e.target === document.querySelector('#Close') && setIsOpen(false));
		}
	}

	async function authorizationHandller(e){
		e.preventDefault();

		const login = document.forms.RegAuthForm.elements.login.value;
		const password = document.forms.RegAuthForm.elements.password.value;

		if (isRegisterWnindow) {
			const email = document.forms.RegAuthForm.elements.email.value;

			const requestOptions = {
				method: 'POST',
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					login: login,
					email: email,
					password: password
				})
			}

			const response = await fetch(registerPath, requestOptions);
			const result = await response.json();

			if (result.status){
				closeModalHandler();
				saveToken(result.token);
				setloggedUser(result.user);
				setisUserLoged(true);
			} else {
				setMessage(result.message);
			}
		} else {
			const requestOptions = {
				method: 'PUT',
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					login: login,
					password: password
				})
			}

			const response = await fetch(loginPath, requestOptions);
			const result = await response.json();

			if (result.status){
				closeModalHandler();
				saveToken(result.token);
				setloggedUser(result.user);
				// setMessage('Вход произведен!');
				setisUserLoged(true);

			} else {
				setMessage(result.message);
			}
		}
	}

	return(
		<React.Fragment>
        <li onClick={() => setIsOpen(true)} > {windowName} </li>

        {isOpen && (
          <div className='modal' onClick ={(e)=> closeModalHandler(e) } >
            <div className='modal-body-auth'>
              <h1>{windowName}</h1>
              <p>{message}</p>

							<form name='RegAuthForm' action="#" onSubmit = {async (e) => { await authorizationHandller(e); /*console.log(123123, loggedUser);  settest(loggedUser);*/}} className='RegAuthForm'>
								<label>Логин: <br/>
									<input name='login' type='text' placeholder="Логин" required/>
								</label>

								{ isRegisterWnindow && (
										<label> Email: <br/>
											<input name='email' type='email' placeholder="Еmail" required/>
										</label>
									)}

								<label>Пароль: <br/>
								<input name='password' type='text' placeholder="Пароль" required/>
								</label>

								<div className='RegAuth-Controls'>
									<button type='submit' >
										{isRegisterWnindow ? 'Регистрация' : 'Вход'}
									</button>

									<button id='Close' onClick={(e) => closeModalHandler(e)}>Отмена</button>
							</div>
							</form>

            </div>
          </div>
        )}
      </React.Fragment>
	)
}

Autorization.propTypes = {
	windowName: PropTypes.string.isRequired,
	isRegisterWnindow: PropTypes.bool.isRequired
}
export default Autorization;

