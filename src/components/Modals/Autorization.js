import React from 'react';
import PropTypes from 'prop-types'
import './Authorization.css'
import  {registerPath, loginPath, sessionToken} from '../Const'
import Context from '../../GlobalContext'

const DEFAULT_MESSAGE = 'Заполните форму';

function saveToken (token) {
	if (localStorage.getItem(sessionToken)){
		localStorage.removeItem(sessionToken)
	}

	localStorage.setItem(sessionToken, token)
}
function Autorization(props) {
	const [isOpen, setIsOpen] = React.useState(false);
	const {windowName, isRegisterWnindow} = props;
	const[message, setMessage] = React.useState(DEFAULT_MESSAGE);
	const {setloggedUser} = React.useContext(Context);

	React.useEffect(() => {
		setMessage(DEFAULT_MESSAGE);
	}, [isOpen]);

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

			const request = await fetch(registerPath, requestOptions);
			const result = await request.json();

			if (result.status){
				setMessage('Вы зарегистрированы!');
				saveToken(result.token);
				closeModalHandler();
				setloggedUser(login);
			} else {
				setMessage('Пользователь уже существует!')
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

			const request = await fetch(loginPath, requestOptions);
			const result = await request.json();

			if (result.status){
				setMessage('Вход произведен!');
				saveToken(result.token);
				closeModalHandler();
				setloggedUser(login);
			} else {
				setMessage('Пользователь не найден!')
			}
		}
	}

	return(
		<React.Fragment>
        <li onClick={() => setIsOpen(true)} > {windowName} </li>

        {isOpen && (
          <div className='modal' onClick ={(e)=> closeModalHandler(e) } >
            <div className='modal-body'>
              <h1>{windowName}</h1>
              <p>{message}</p>

							<form name='RegAuthForm' action="#" onSubmit = {(e) => authorizationHandller(e)} className='RegAuthForm'>
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

